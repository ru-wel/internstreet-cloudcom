import Log from "../models/Log.js";
import { UAParser } from 'ua-parser-js';
import { getEmail, getToken } from "../routes/login.js";
// import { jwtDecode } from "jwt-decode";
import os from 'os';
import axios from 'axios';
import { fetchedBrowser, getUserIP } from "../routes/utils.js";

async function getUserDetails() {
  const parser = new UAParser();
  const cpu = parser.getCPU();

  // const res = await axios.get('https://ipinfo.io/json');
  // const realIP = await axios.get(process.env.API_URL + '/utils/realIP');
  // console.log("REAL IP is: " + realIP);
  // const res = await axios.get('https://ipinfo.io/' + realIP + "/json");
  
  const realIP = getUserIP();
  console.log(realIP, typeof(realIP));
  console.log('https://ipinfo.io/' + realIP + "/json");
  // const res = await axios.get(`https://ipinfo.io/${realIP}/json`);
  
  return {
    realIP: getUserIP(),
    res: await axios.get(`https://ipinfo.io/${realIP}/json`),
    ip_address: getUserIP() || "Empty",
    location: `${res.data.city}, ${res.data.region}, ${res.data.country}` || "Empty",
    os_version: setOS() || "Unknown OS",
    processor: cpu.architecture || os.cpus()[0].model || "Empty",
    browser_type: setBrowser() || "Unknown Browser"
  };
}

export async function LogAction(message, rEmail) {

    const { ip_address, location, os_version, processor, browser_type } = await getUserDetails();
    // const fetchResult = await fetchUserDetails();
    // let result;
    
    // if(fetchResult){
    //   result = await fetchUserDetails();
    // }
    // console.log(result.id, result.name, result.email, result.user_role);

    // const token = getToken();

    // try {
    //   const response = await fetch('http://localhost:3000/validate-token', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   const data = await response.json();
    //   if (!response.ok && !data.valid){
    //     console.log("User is not logged in!")
    //   }
    //   const decoded = jwtDecode(token);
    //   if (decoded.exp * 1000 < Date.now()){
    //     console.log("Token expired!")
    //   } else { 
    //     email = decoded.email; 
    //   }
    // } catch (error) {
    //   console.error('Error decoding token: ', error);
    // }

    await Log.create({
        email: getEmail() || rEmail || 'Unknown',
        action: message,
        ip_address: ip_address,
        os_version: os_version,
        processor: processor,
        browser_type: browser_type,
        location: location
    });
    // console.log("NEW LOGS:", newLog);
}

function setOS() {
  const os = fetchedBrowser()[1];

  if (!os) return "Unknown OS";

  let formattedOS = os;
  if (os.includes('OS X')) {
    formattedOS = os.replace('OS X', 'macOS');
  }

  return formattedOS;
}

function setBrowser() {
  const browser = fetchedBrowser()[0];

  if (!browser) return "Unknown Browser";

  let formattedBrowser = browser;
  
  if (browser.includes('Microsoft ')) {
    formattedBrowser = browser.replace('Microsoft ', '');
  }

  return formattedBrowser;
}