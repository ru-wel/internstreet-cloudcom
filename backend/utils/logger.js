import Log from "../models/Log.js";
import { getEmail, getToken } from "../routes/login.js";
// import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { fetchedBrowser, getUserIP } from "../routes/utils.js";

async function getUserDetails() {

  const ipuser = getUserIP();
  const res = await axios.get(`https://ipinfo.io/${ipuser}/json`);
  console.log("USER IP: " + getUserIP());

  return {
    ip_address: getUserIP() || "Empty",
    location: `${res.data.city}, ${res.data.region}, ${res.data.country}` || "Empty",
    os_version: setOS() || "Unknown OS",
    browser_type: setBrowser() || "Unknown Browser"
  };
}

export async function LogAction(message, rEmail) {

    const { ip_address, location, os_version, browser_type } = await getUserDetails();

    await Log.create({
        email: getEmail() || rEmail || 'Unknown',
        action: message,
        ip_address: ip_address,
        os_version: os_version,
        browser_type: browser_type,
        location: location
    });
}

function setOS() {
  const os = fetchedBrowser()[1];

  if (!os) return "Unknown OS";

  let formattedOS = os;
  if (os.includes('OS X')) {
    formattedOS = os.replace('OS X', 'macOS');
  } else if (os.includes('Linux ')) {
    formattedOS = os.replace('Linux ', '');
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