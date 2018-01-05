const linkedinRequest = require('./crawler_linkedin');
const config = require('./linkedinConfig');

function main(){
    const prefix = config.prefix;
    const pageMax = config.pageMax;
    const pageWaitMax = config.pageWaitMax;
    // const dataRel = Object.assign({}, config.sortByRelevance); // sort by relevance
    const dataDD = Object.assign({}, config.sortByDate); // sort by day

    // linkedinRequest(prefix, dataRel, pageMax, pageWaitMax);
    linkedinRequest(prefix, dataDD, pageMax, pageWaitMax);
    
}
main()
