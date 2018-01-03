const puppeteer = require('puppeteer');
const fs = require('fs');
const utils = require('./utils');

const log = console.log

async function main () {
    log('start main function');
    try{
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const prefix = 'https://www.linkedin.com/jobs/search?';
        let data = {
            'keywords': 'Software+Engineer+Intern',
            'sortBy': 'R',
            'locationId': 'us:0',
            'start': 0,
            'count': 25
        }

        for(let i = 0; i < 1; i++){
            data.start = 25 * i;
            let dataArr = [];
            for(let k in data){
                dataArr.push(k + '=' + data[k]);
            }
            const requestUrl = prefix + dataArr.join('&');
            log(requestUrl);
            const page = await browser.newPage();
            await page.goto(requestUrl);
            await page.waitFor(1000); // wait extra 1s
            log('wait 5s end');
            const rawJobData = await page.evaluate(()=>{
                window.scrollTo(0,document.body.scrollHeight);

                const list = document.querySelectorAll('li.job-listing');
                NodeList.prototype.map = Array.prototype.map;
                return list.map(item=>{
                    const tmp = {
                        job: item.querySelector('.job-title-text').innerText,
                        company: item.querySelector('.company-name-text').innerText,
                        location: item.querySelector('.job-location > span').innerText,
                        postDateRaw: item.querySelector('.date-posted-or-new').innerText,
                        postDate: '',
                        source: 'linkedin',
                        desc: item.querySelector('.job-description').innerText,
                        identifier: '',
                        logoUrl: item.querySelector('img.company-logo').getAttribute('data-delayed-url'),
                        detailUrl: item.querySelector('a.job-title-link').innerText
                    };
                    return tmp;
                })
            })
            console.log(rawJobData);
            const processed = rawJobData.map(item=>{
                item.postDate = utils.postDateGen(item.postDateRaw);
                item.identifier = utils.identifierGen(item.company, item.job, item.location, item.postDate);
                return item;
            })
            console.log(processed);
            await page.close();
            await browser.close();
        }

    }catch(e){
        log(e);
        process.exit();
    }
}
main();