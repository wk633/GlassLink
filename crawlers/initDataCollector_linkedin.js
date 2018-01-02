const puppeteer = require('puppeteer');
const fs = require('fs');

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
            log('wait 1s end');
            const rawJobData = await page.evaluate(()=>{
                function queryInnerText(item, selector){
                    return ;
                }
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
                        logoUrl: item.querySelector('.company-logo').src,
                        detailUrl: item.querySelector('a.job-title-link').innerText
                    };
                    return tmp;
                })
            })
            console.log(rawJobData);
            await page.close();
            await browser.close();
        }

    }catch(e){
        log(e);
        process.exit();
    }
}
main();