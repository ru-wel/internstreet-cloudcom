import Log from "../models/Log.js";
import axios from 'axios';
import { UAParser } from 'ua-parser-js';
import os from 'os';

async function getUserDetails() {
  const parser = new UAParser();
  const fetchOs = parser.getOS();
  const cpu = parser.getCPU();
  const browser = parser.getBrowser();

  const osVersion = fetchOs.name + ' ' + fetchOs.version;
  const realOS = osVersion.includes("undefined") ? null : osVersion;

  const res = await axios.get('https://ipinfo.io/json');
  
  return {
    ip_address: res.data.ip || "Empty",
    location: `${res.data.city}, ${res.data.region}, ${res.data.country}` || "Empty",
    os_version: realOS || os.type + ' ' + os.release + ' ' + os.platform || "Empty",
    processor: cpu.architecture || os.cpus()[0].model || "Empty",
    browser_type: browser.name + ' ' + browser.version
  };
}

export async function LogAction(message) {

    const { ip_address, location, os_version, processor, browser_type } = await getUserDetails();
    const adminUser = "adminuser@gmail.com";
    const newLog = await Log.create({
        email: adminUser,
        action: message,
        ip_address: ip_address,
        os_version: os_version,
        processor: processor,
        browser_type: browser_type,
        location: location
    });
    // console.log("NEW LOGS:", newLog);
}

