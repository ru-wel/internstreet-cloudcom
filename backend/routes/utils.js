import express from 'express';
import { LogAction } from '../utils/logger.js';
import { requireUser, requireAdmin } from '../middleware/auth.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Log from '../models/Log.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3, BUCKET } from '../config/storage.js';
import { Op } from 'sequelize';

const app = express();
app.use(express.json());

const router = express.Router();
router.get('/logout', requireUser, async (req, res) => {
    await LogAction(req, 'Has logged out');
    res.json({ message: "User has logged out successfuly." });
})

// DOWNLOAD RESUME/COVER
router.get('/download/:id/:filename', requireAdmin, async (req, res) => {
  // The demo admin is public, and the files are applicants' real documents
  if (req.user.demo) return res.status(403).json({ message: 'File downloads are turned off for the demo admin.' });
  try {
    const application = await Application.findByPk(req.params.id);

    if (!application) {
        return res.status(404).json({ message: 'Application not found' });
    }

    if (application.resume !== req.params.filename && application.cover_letter !== req.params.filename) {
        return res.status(400).json({ message: 'Filename does not exist' });
    }        

    // The bucket is private, so hand back a short-lived signed link to the file
    const url = await getSignedUrl(s3, new GetObjectCommand({
        Bucket: BUCKET,
        Key: req.params.filename,
        ResponseContentDisposition: `attachment; filename="${req.params.filename}"`,
    }), { expiresIn: 60 });
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving the file', error: err.message });
  }
});

// FOR ANALYTICS - TO BE EDITED PA
router.get('/analytics', requireAdmin, async (req, res) => {
  try {
      const userCounts = await getLastWeekUserCounts(User, 'created_at');
      const applicationCounts = await getLastWeekUserCounts(Application, 'applied_at');
      const slicedLogs = await Log.findAll({ order: [['id', 'DESC']], limit: 5, raw: true });

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
router.get('/count', requireAdmin, async (req, res) => {
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
