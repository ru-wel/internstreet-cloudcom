import Log from "../models/Log.js";
import axios from 'axios';
import { UAParser } from 'ua-parser-js';

async function getUserDetails() {
  const parser = new UAParser();
  const os = parser.getOS();
  const cpu = parser.getCPU();
  const browser = parser.getBrowser();

  const res = await axios.get('https://ipinfo.io/json');
  
  return {
    ip_address: res.data.ip,
    location: `${res.data.city}, ${res.data.region}, ${res.data.country}`,
    os_version: os.name + ' ' + os.version,
    processor: cpu.architecture,
    browser_type: browser.name + ' ' + browser.version
  };
}

export async function LogAction(email, message) {

    const { ip_address, location, os_version, processor, browser_type } = await getUserDetails();
    const newLog = await Log.create({
        email: email,
        action: message,
        ip_address: ip_address || "Empty",
        os_version: os_version || "Empty",
        processor: processor || "Empty",
        browser_type: browser_type || "Empty",
        location: location || "Empty"
    });
    console.log("NEW LOGS:", newLog);

}