import express from 'express';
import platform from 'platform';
import { LogAction } from '../utils/logger.js';
import { getToken } from './login.js';
import User from '../models/User.js';
import { jwtDecode } from "jwt-decode";

const app = express();
app.use(express.json());

const router = express.Router();
let browserType = null;

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