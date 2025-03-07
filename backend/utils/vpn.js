
import axios from 'axios';

export async function checkVPN() {

    const getIp = await axios.get('https://ipinfo.io/json');
    const userIp = getIp.data.ip;

    const res = await axios.get(`http://ip-api.com/json/${userIp}?fields=proxy`);
    const isVpn = res.data.proxy;

    isVpn ? (console.log("execute natin success login sa admin")) : (console.log("show user error login about vps shit?"));

}