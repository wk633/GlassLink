# GlassLink
A job hunting web application which collects job information posted in glassdoor and linkedin.



### Linkedin Search Analysis

url: https://www.linkedin.com/jobs/search?keywords=Software%20Engineering%20Intern&sortBy=R&locationId=us%3A0



| key        | value                       |
| ---------- | --------------------------- |
| keywords   |                             |
| sortBy     | R(relavence), DD(post date) |
| locationId | us%3A0                      |



page 2

url: https://www.linkedin.com/jobs/search?keywords=Software+Engineering+Intern&sortBy=R&locationId=us:0&start=25&count=25&applyLogin=false&trk=jobs_jserp_pagination_2



| key        | value                       |
| ---------- | --------------------------- |
| keywords   | Software+Engineering+Intern |
| sortBy     | R                           |
| locationId | us:0                        |
| start      | 25                          |
| count      | 25                          |
| applyLogin |                             |
| trk        | jobs_jserp_pagination_2     |



simplified url:

https://www.linkedin.com/jobs/search?keywords=Software+Engineering+Intern&sortBy=R&locationId=us:0&start=25&count=25



page 3 url:

https://www.linkedin.com/jobs/search?keywords=Software+Engineering+Intern&sortBy=R&locationId=us:0&start=50&count=25



To collect some data, we only need crawl first 100 job.

In the future, we need to monitor jobs sort by post date





### glassdoor search analysis

an internship search example:

https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=software+engineer+internship&sc.keyword=software+engineer+internship&locT=&locId=&jobType=internship



prefix: https://www.glassdoor.com/Job/jobs.htm?

| key           | value                        |
| ------------- | ---------------------------- |
| suggestCount  | 0                            |
| suggestChosen | false                        |
| clickSource   | searchBtn                    |
| typedKeyword  | software+engineer+internship |
| sc.keyword    | software+engineer+internship |
| locT          |                              |
| locId         |                              |
| jobType       | internship                   |



