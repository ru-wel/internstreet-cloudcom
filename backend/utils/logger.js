import Log from "../models/Log.js";
import platform from 'platform';
import axios from 'axios';

// Everything comes from this request (not shared state), so each log names the right user
function getRequestDetails(req) {
  const forwarded = req.headers['x-forwarded-for']?.split(',')[0].trim();
  const ip_address = req.headers['x-real-ip'] || forwarded || req.socket.remoteAddress || 'Unknown';
  const agent = platform.parse(req.headers['user-agent'] || '');

  const browser = agent.name ? `${agent.name} ${agent.version ?? ''}`.trim().replace('Microsoft ', '') : 'Unknown Browser';
  let os = agent.os?.family ? `${agent.os.family} ${agent.os.version ?? ''}`.trim() : 'Unknown OS';
  if (os.includes('OS X')) os = os.replace('OS X', 'macOS');
  else if (os.includes('Linux ')) os = os.replace('Linux ', '');

  return { ip_address, os_version: os, browser_type: browser };
}

async function getLocation(ip) {
  try {
    const { data } = await axios.get(`https://ipinfo.io/${ip}/json`, { timeout: 3000 });
    // Local and private addresses come back as "bogon" with no city
    return data.city ? `${data.city}, ${data.region}, ${data.country}` : 'Unknown';
  } catch {
    return 'Unknown';
  }
}

// Writes an activity log for this request. email defaults to the logged-in user;
// login and register pass it in. Never throws: a failed log must not break the request.
export async function LogAction(req, message, email = req.user?.email) {
  try {
    const details = getRequestDetails(req);
    await Log.create({
      email: email || 'Unknown',
      action: message,
      ...details,
      location: await getLocation(details.ip_address),
    });
  } catch (error) {
    console.error('Error writing log:', error.message);
  }
}
