import express from 'express';
import platform from 'platform';

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

export default router;
export const fetchedBrowser = () => browserType;