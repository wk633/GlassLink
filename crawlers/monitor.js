var shell = require("shelljs");
shell.exec('node monitor_linkedin.js');
setInterval(()=>{
    shell.exec('node monitor_linkedin.js');
}, 2*60*1000*60)

setTimeout(()=>{
    shell.exec('node monitor_glassdoor.js');
    setInterval(()=>{
        shell.exec('node monitor_glassdoor.js');
    }, 2*60*1000*60)
}, 60*1000*60);

// 00:00  linkedin
// 01:00  glassdoor
// 02:00  linkedin
// 03:00  glassdoor