const puppeteer = require('puppeteer');
const fs = require('fs');
const utils = require('./utils');

const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('../config').DB.URL);
const Linkedin = require('../models/linkedin')(conn);



const log = console.log

async function main () {
    log('start main function');
    try{
        const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const prefix = 'https://www.linkedin.com/jobs/search?';
        let data = {
            'keywords': 'Software+Engineer+Intern',
            'sortBy': 'R',
            'locationId': 'us:0',
            'start': 0,
            'count': 25
        }
        const page = await browser.newPage();
        for(let i = 0; i < 8; i++){
            data.start = 25 * i;
            let dataArr = [];
            for(let k in data){
                dataArr.push(k + '=' + data[k]);
            }
            const requestUrl = prefix + dataArr.join('&');
            log(requestUrl);
            await page.goto(requestUrl, {waitUntil: 'networkidle2'});
            await page.waitFor(1000); // wait extra 1s
            // log('wait 5s end');
            const rawJobData = await page.evaluate(()=>{
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

            const processed = rawJobData.map(item=>{
                item.postDate = utils.postDateGen(item.postDateRaw);
                item.identifier = utils.identifierGen(item.company, item.job, item.location, item.postDate);
                return item;
            })
            const length = processed.length;
            log(`${length} items to be saved`);
            await Promise.all(processed.map(async(item) => {
                // let linkedinModel = new Linkedin(item);
                try{
                    const d = await Linkedin.findOneAndUpdate({
                        identifier: item.identifier
                    },item, {upsert: true, new: true} ) // if not exist, insert it
                    if(d != null){
                        log(`${d.company} - ${d.job} saved or updated`)
                    }else{
                        log('doc is null')
                    }
                    
                }catch(e){
                    log('error!!!');
                    log(e);
                }
            }))
            
        }
        await page.close();
        await conn.close();
        await browser.close();

    }catch(e){
        log(e);
        process.exit();
    }
}
main();