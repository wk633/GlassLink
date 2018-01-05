const puppeteer = require('puppeteer');
const config = require('./glassdoorConfig');
const utils = require('./utils');
const log = console.log

async function main(){
    try{
        const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        const requestUrl = config.prefix + utils.attributeCombine(config.sortByRelevance);
        log(requestUrl);
        await page.goto(requestUrl, {waitUntil: 'networkidle2'});
        await page.waitFor(3000);

        // get first page data
        const data = await page.evaluate(()=>{
            let lists = document.querySelectorAll('.jl');
            NodeList.prototype.map = Array.prototype.map;
            return lists.map(item=>{
                const rightBlock = item.querySelector('.logoWrap+div');
                const companyAndLoc  = rightBlock.querySelector('.empLoc').innerText.split(' – ');
                const postDate = rightBlock.querySelector('.minor');
                const logo = item.querySelector('img');
                let tmp = {
                    job: rightBlock.querySelector('.jobLink').innerText,
                    company: companyAndLoc[0],
                    location: companyAndLoc[1],
                    postDateRaw: postDate ? postDate.innerText : '',
                    postDate: '',
                    source: 'glassdoor',
                    desc: '',
                    identifier: '',
                    logoUrl: logo ? logo.getAttribute('data-original') : '',
                    detailUrl: item.querySelector('a.jobLink').href
                };
                return tmp;
            })
        })
        console.log(data);
        
    }catch(e){
        log(e);
        process.exit();
    }
}
main();