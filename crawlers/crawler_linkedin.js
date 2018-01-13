const puppeteer = require('puppeteer');
const fs = require('fs');
const utils = require('./utils');

const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('../config').DB.URL);
const Job = require('../models/job')(conn);


const log = console.log

module.exports = async function main (prefix, dataRel, pageMax, pageWaitMax) {
    log('start main function');
    try{
        let browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});
        // const prefix = 'https://www.linkedin.com/jobs/search?';
        let data = dataRel;
        let page = await browser.newPage();
        for(let i = 0; i < pageMax; i++){
            data.start = 25 * i;
            let dataArr = [];
            for(let k in data){
                dataArr.push(k + '=' + data[k]);
            }
            const requestUrl = prefix + dataArr.join('&');
            log(requestUrl);
            await page.goto(requestUrl, {waitUntil: 'networkidle2'});
            await page.waitFor(3000);
            await page.evaluate(()=>{
                const div = document.querySelector('.jserp-container')
                for(let k = 1; k <= 5; k++) {
                    setTimeout(()=>{
                        window.scrollBy(0, div.scrollHeight * k / 5);
                    }, 1000*k)
                }
            })
            await page.waitFor(1000);
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
                        detailUrl: item.querySelector('a.job-title-link').href
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
                    const d = await Job.findOneAndUpdate({
                        identifier: item.identifier
                    },item, {upsert: true, new: true} ) // if not exist, insert it
                    if(d != null){
                        // log(`${d.company} - ${d.job} saved or updated`)
                    }else{
                        log('doc is null')
                    }
                    
                }catch(e){
                    log('error!!!');
                    log(e);
                }
            }))
        }

        await conn.close();
        log('connection close---')
        await page.close();
        log('page close----');
        await browser.close();
        log('browser close----')
    }catch(e){
        log(e);
        process.exit();
    }
}