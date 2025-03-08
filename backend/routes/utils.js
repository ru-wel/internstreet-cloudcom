import express from 'express';
import platform from 'platform';
import { LogAction } from '../utils/logger';

const router = express.Router();
let browserType = null;

router.get('/detect-browser', (req, res) => {
    const userAgent = req.headers['user-agent'];

    if (!userAgent) {
        return res.status(400).json({ error: "User-Agent not found in request" });
    }

    const browser = platform.parse(userAgent);

    res.json({ message: "Successfully fetched browser type." });
    browserType = browser.name + ' ' + browser.version;
});

router.get('/logout', (req, res) => {
    LogAction('Has logged out')
    res.json({ message: "User has logged out successfuly." });
})


export default router;
export const fetchedBrowser = () => browserType;