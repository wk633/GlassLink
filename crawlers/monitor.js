var shell = require("shelljs");
shell.exec('node monitor_linkedin.js');
setTimeout(()=>{
    shell.exec('node monitor_glassdoor.js');
}, 1*60*60*1000);