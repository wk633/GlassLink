const puppeteer = require('puppeteer');
const config = require('./glassdoorConfig');
const utils = require('./utils');
const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('../config').DB.URL);
const Glassdoor = require('../models/glassdoor')(conn);

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
        let info = await page.evaluate(()=>{
            let lists = document.querySelectorAll('.jl');
            NodeList.prototype.map = Array.prototype.map;
            const div = document.querySelector('.jlGrid')
            for(let k = 1; k <= 5; k++) {
                setTimeout(()=>{
                    window.scrollBy(0, div.scrollHeight * k / 5);
                }, 1000*k)
            }
            let firstPageData = lists.map(item=>{
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
            let nextPagesDom = document.querySelectorAll('li.page>a');
            let nextPages = [];
            nextPagesDom.map(item=>{
                nextPages.push(item.href);
            });
            nextPages.splice(3);
            return {
                firstPageData,
                nextPages
            }
        })
        await save(info.firstPageData);

        for(let i = 0; i < info.nextPages.length; i++) {
            await page.goto(info.nextPages[i], {waitUntil: 'networkidle2'});
            let infoTmp = await page.evaluate(()=>{
                let lists = document.querySelectorAll('.jl');
                NodeList.prototype.map = Array.prototype.map;
                const div = document.querySelector('.jlGrid')
                for(let k = 1; k <= 5; k++) {
                    setTimeout(()=>{
                        window.scrollBy(0, div.scrollHeight * k / 5);
                    }, 1000*k)
                }
                return lists.map(item=>{
                    const rightBlock = item.querySelector('.logoWrap+div');
                    const companyAndLoc  = rightBlock.querySelector('.empLoc').innerText.split(' – ');
                    const postDate = rightBlock.querySelector('.minor');
                    const logo = item.querySelector('img');
                    let tmp = {
                        job: rightBlock.querySelector('.jobLink').innerText,
                        company: companyAndLoc[0],
                        location: companyAndLoc[1].substr(0, companyAndLoc[1].length - 1),
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
            await save(infoTmp);
        }
        await page.close()
        await browser.close();
        await conn.close();

    }catch(e){
        log(e);
        process.exit();
    }
}

async function save(info){
    info.map(async (item)=>{
        item.postDate = utils.glassdoorPostDateGen(item.postDateRaw);
        item.identifier = utils.identifierGen(item.company, item.job, item.location, item.postDate);
        try{
            const d = await Glassdoor.findOneAndUpdate({
                identifier: item.identifier
            },item, {upsert: true, new: true} ) // if not exist, insert it
            if(d != null){
                console.log(`${d.company} - ${d.job} saved or updated`)
            }else{
                console.log('doc is null')
            }
        }catch(e){
            console.log('error!!!');
            console.log(e);
        }
    })
    return;
}

main();