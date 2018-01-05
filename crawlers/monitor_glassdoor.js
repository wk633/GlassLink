const glassdoorRequest = require('./crawler_glassdoor');

function main(){
    glassdoorRequest();
}
function run(){
    main();
    setInterval(main, 1000*60*60*2);
}
run()