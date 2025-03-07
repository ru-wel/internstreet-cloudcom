import express from 'express';
import { LogAction } from '../utils/logger.js';
import Log from '../models/Log.js';

const app = express();
app.use(express.json());

const router = express.Router();

// FETCH LOGS
router.get('/', async (req, res) => { 
    try {
        const logs = await Log.findAll();
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// DELETE LOG
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const log = await Log.findOne({ where: { "id" : id } });

        if (!log) return res.status(404).json({ message: 'Log not found!'});

        await Log.destroy({ where: { "id" : id } });
        const message = `Successfully deleted Log`;
        res.status(200).json({ message: message });
        await LogAction(message);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

export default router;