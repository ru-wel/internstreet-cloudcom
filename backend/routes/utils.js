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
import axios from 'axios';

const app = express();
app.use(express.json());
app.set('trust proxy', true);

const router = express.Router();
let browserType = null;
let osDetails = null;
let userIP = null;

router.get('/detect-browser', async (req, res) => {
    const userAgent = req.headers['user-agent'];
    const userIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!userAgent) {
        return res.status(400).json({ error: "User-Agent not found in request" });
    }

    const browser = platform.parse(userAgent);

    res.json({ message: "Successfully fetched browser type." });
    browserType = browser.name + ' ' + browser.version;
    osDetails = browser.os.family + ' ' + browser.os.version;
    userIP = userIp;

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

// COUNT APPLICATION, JOBS, LOGS, USERS OBJECTS IN TABLES
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

  const resp = await axios.get(`http://ip-api.com/json/${clientIP}?fields=proxy`);

  const proxy = resp.data.proxy;
  res.json({ proxy });
});

const getLastWeekUserCounts = async (model, dbValue) => {
  const today = new Date();
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - today.getDay() - 6);
  lastMonday.setHours(0, 0, 0, 0);

  const date = {};

  for (let i = 0; i < 7; i++) {
    const startOfDay = new Date(lastMonday.getTime());
    startOfDay.setDate(lastMonday.getDate() + i);

    const endOfDay = new Date(startOfDay.getTime());
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

export default router;
export const fetchedBrowser = () => [browserType, osDetails];
export const getUserIP = () => userIP;