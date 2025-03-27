import express from 'express';
import platform from 'platform';
import { LogAction } from '../utils/logger.js';
import { getToken } from './login.js';
import { jwtDecode } from "jwt-decode";
import Application from '../models/Application.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Log from '../models/Log.js';
import path from 'path';
import { Op } from 'sequelize';

const app = express();
app.use(express.json());
app.set('trust proxy', true);

const router = express.Router();
let browserType = null;
let osDetails = null;
let processor = null;
let userIP = null;

// ----- FETCH USER DETAILS FUNCTION ------


// export async function fetchUserDetails() {
//     const token = getToken();
//     let id, name, email, user_role;

//     if(!token){
//         return { id, name, email, user_role };
//     }
//     let userId;

//     try {
//         const response = await fetch('http://localhost:3000/validate-token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//         },
//         });

//         const data = await response.json();
//         if (!response.ok && !data.valid){
//         console.log("User is not logged in!")
//         }
//         const decoded = jwtDecode(token);
//         if (decoded.exp * 1000 < Date.now()){
//         console.log("Token expired!")
//         } else { 
//         userId = decoded.id; 
//         console.log('THE USER ID IS NOW SET:', userId);
//         }
//     } catch (error) {
//         console.error('Error decoding token: ', error);
//     }

//     if (!userId){
//         return;
//     }
//     const user = await User.findOne({ where: { 'id' : userId } });

//     id = user.id;
//     name = user.name;
//     email = user.email;
//     user_role = user.user_role;
//     console.log('USER EMAIL: ', email);

//     return { id, name, email, user_role };
// }


// ---------------------------------

router.post('/detect-browser', async (req, res) => {
    const userAgent = req.headers['user-agent'];
    const userIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!userAgent) {
        return res.status(400).json({ error: "User-Agent not found in request" });
    }

    const browser = platform.parse(userAgent);

    const clientCPU = req.body.cpu || { cores: "Unknown", model: "Unknown" };

    console.log("CLIENT CPU: " + clientCPU);

    res.json({ message: "Successfully fetched browser type." });
    browserType = browser.name + ' ' + browser.version;
    osDetails = browser.os.family + ' ' + browser.os.version;
    userIP = userIp;
    processor = clientCPU;

});

router.get('/logout', (req, res) => {
    LogAction('Has logged out')
    res.json({ message: "User has logged out successfuly." });
})

// DOWNLOAD RESUME/COVER
router.get('/download/:id/:filename', async (req, res) => { 
    try {
        const application = await Application.findByPk(req.params.id);
    
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.resume !== req.params.filename && application.cover_letter !== req.params.filename) {
            return res.status(400).json({ message: 'Filename does not exist' });
        }        

        const filePath = path.join('uploads', req.params.filename);
        const fileName = req.params.filename;

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${application.file_name}"`);
        res.download(filePath, fileName, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error downloading the file', error: err });
            }
        });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving the file', error: err.message });
        }
});

// FOR ANALYTICS - TO BE EDITED PA
router.get('/analytics', async (req, res) => { 
    try {
        const userCounts = await getLastWeekUserCounts(User, 'created_at');
        const applicationCounts = await getLastWeekUserCounts(Application, 'applied_at');
        const logResult = await fetch(process.env.API_URL + `/logs`);

        const fetchedLogs = await logResult.json();
        const slicedLogs = fetchedLogs.slice(0, 5);

        let usersDetails = await Promise.all(
            slicedLogs.map(async log => {
                const result = await User.findAll({
                    where: { email: log.email },
                });
        
                return {
                    ...log,
                    name: result.length > 0 ? result[0].dataValues.name : "Unknown"
                };
            })
        );
        
        res.status(200).json({ userCounts, applicationCounts, slicedLogs: usersDetails });
        
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// COUNT OBJECTS IN TABLES
router.get('/count', async (req, res) => {
  try {
    const [appCount, jobCount, logCount, userCount] = await Promise.all([
      Application.count(),
      Job.count(),
      Log.count(),
      User.count()
    ]);

    res.json({
      applications: appCount,
      jobs: jobCount,
      logs: logCount,
      users: userCount
    });
  } catch (error) {
    console.error('Error counting fields:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/realIP', async (req, res) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(clientIP);
  res.json({ message: "Successfully fetched IP Address." });
  // userIP = clientIP;
});

const getLastWeekUserCounts = async (model, dbValue) => {
  const today = new Date();
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - today.getDay() - 6);
  lastMonday.setHours(0, 0, 0, 0);

  const date = {};

  for (let i = 0; i < 7; i++) {
    const startOfDay = new Date(lastMonday);
    startOfDay.setDate(lastMonday.getDate() + i);

    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    const count = await model.count({
        where: {
            [dbValue]: { 
              [Op.between]: [startOfDay, endOfDay] 
            }
        }
    });

    date[startOfDay.toLocaleDateString("en-US", { weekday: "long" })] = count;
  }

  return { date };
};

// TRY | FETCH OS + DEVICE TYPE
// router.get('/os', (req, res) => {

//   const userAgent = req.headers['user-agent'];

//   if (!userAgent) {
//       return res.status(400).json({ error: "User-Agent not found in request" });
//   }

//   const os = platform.parse(userAgent);
//   console.log(os);

//   res.json({ message: "Successfully fetched OS details." });
//   osDetails = os.os.family + ' ' + os.os.version;

//   // console.log(os.name + ' ' + os.version);
//   // console.log(result.os.name);
//   // console.log(result.os.version);
//   // console.log(result.device.is('mobile'));
// });

export default router;
export const fetchedBrowser = () => [browserType, osDetails];
export const getUserIP = () => userIP;
export const getCPU = () => processor;