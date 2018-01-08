var shell = require("shelljs");
shell.exec('node monitor_linkedin.js');
setInterval(()=>{
    shell.exec('node monitor_linkedin.js');
}, 60*1000*10)

setTimeout(()=>{
    shell.exec('node monitor_glassdoor.js');
    setInterval(()=>{
        shell.exec('node monitor_glassdoor.js');
    }, 60*1000*60)
}, 30*1000*60);

// 00:00  linkedin
// 00:30  glassdoor
// 01:00  linkedin
// 01:30  glassdoor