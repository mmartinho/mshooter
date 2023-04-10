const os=require('os');

class Network {

    /**
     * One IPv4 Wi-Fi address
     * @returns string
     */
    static oneIPv4WifiAddress() {
        const nets = Network.allIPv4Nets();
        var ip = '';
        nets.forEach(net => {
            if(net.name == 'Wi-Fi') {
                ip = net.address;
            }
        });
        return ip;
    }

    /** */
    static hostname() {
        return os.hostname();
    }

    /**
     * All IPs v4 from host network interfaces
     * @returns {name, address}[]
     */
    static allIPv4Nets() {
        const nets = os.networkInterfaces();
        const results = []; 
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                /** 
                 * Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                 * (IPv4 is in Node <= 17, from 18 it's a number 4 or 6)
                 */
                const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
                if (net.family === familyV4Value && !net.internal) {
                    results.push({name: name, address: net.address});
                }
            }
        }
        return results;        
    }
}

module.exports=Network;