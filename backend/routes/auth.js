import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const router = express.Router();

router.post('/', checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET || 'internstreetcloudcomputing', (err, tokenData) => {
      if (err || tokenData.role != 'admin'){      // ADD tokenData.role != 'user'
        console.log(err);
        res.status(403).json({message:'Please log in.'});
      } else {
        return res.json({ valid: true, user: tokenData });
      }
    });
  } catch (error) {
    console.error('Error: ', err);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

function checkToken(req, res, next){
  const header = req.headers['authorization'];
  if (typeof header !== 'undefined'){
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(403).json({ valid: false, message: "Token is required" });
  }
}

export default router;