import Log from "../models/Log.js";
import { UAParser } from 'ua-parser-js';
import { getToken } from "../routes/login.js";
import { jwtDecode } from "jwt-decode";
import os from 'os';
import axios from 'axios';
import { fetchedBrowser } from "../routes/utils.js";

async function getUserDetails() {
  const parser = new UAParser();
  const fetchOs = parser.getOS();
  const cpu = parser.getCPU();

  const osVersion = fetchOs.name + ' ' + fetchOs.version;
  const realOS = osVersion.includes("undefined") ? null : osVersion;

  const res = await axios.get('https://ipinfo.io/json');
  
  return {
    ip_address: res.data.ip || "Empty",
    location: `${res.data.city}, ${res.data.region}, ${res.data.country}` || "Empty",
    os_version: realOS || os.type + ' ' + os.release + ' ' + os.platform || "Empty",
    processor: cpu.architecture || os.cpus()[0].model || "Empty",
    browser_type: fetchedBrowser() || "Unknown Browser"
  };
}

export async function LogAction(message, email) {

    const { ip_address, location, os_version, processor, browser_type } = await getUserDetails();

    const token = getToken();

    try {
      const response = await fetch('http://localhost:3000/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok && !data.valid){
        console.log("User is not logged in!")
      }
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()){
        console.log("Token expired!")
      } else { 
        email = decoded.email; 
      }
    } catch (error) {
      console.error('Error decoding token: ', error);
    }

    const newLog = await Log.create({
        email: email || 'Unknown',
        action: message,
        ip_address: ip_address,
        os_version: os_version,
        processor: processor,
        browser_type: browser_type,
        location: location
    });
    // console.log("NEW LOGS:", newLog);
}

