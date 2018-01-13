import React from 'react';
import { Collapse, Avatar, Badge, List, Icon} from 'antd';
const Panel = Collapse.Panel;

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

export default class JobList extends React.Component{
    render(){
        const dd = [{
            _id: "5a5a6f8ccf10eb431e7a78ba",
            userId: "5a5686ca732cb113f4027d6b",
            jobId: {
            job: "MATLAB Mobile Summer Intern",
            company: "MathWorks",
            location: "Natick, MA, US",
            postDate: "2018-01-13T20:41:28.126Z",
            source: "linkedin",
            desc: "As an intern software engineer you will support a variety of software development activities in a fast paced engineering environment. MathWorks develops MATLAB and Simulink, the... bebee.com",
            logoUrl: "https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAApAAAAAJGE2MDJjOTQ2LTU2N2EtNGIzNC05ZDY2LWEzZjJiYjk0Yzc3OA.png",
            detailUrl: "https://www.linkedin.com/jobs/view/matlab-mobile-summer-intern-at-mathworks-568878680?trkInfo=searchKeywordString%3ASoftware%2BEngineer%2BIntern%2CsearchLocationString%3A%252C%2B%2Cvertical%3Ajobs%2CpageNum%3A0%2Cposition%3A14%2CMSRPsearchId%3A51569a1a-fca5-4178-a65b-81a3d0674de0&refId=51569a1a-fca5-4178-a65b-81a3d0674de0&trk=jobs_jserp_job_listing_text",
            __v: 0,
            identifier: "ef1992f9a1a33fea9346be92e256e9f6",
            _id: "5a5a62043a0cb668a7f87160"
            },
            postDate: "2018-01-13T20:41:28.126Z",
            source: "linkedin",
            status: "unread"
            },
            {
            _id: "5a5a6f8ccf10eb431e7a78bb",
            userId: "5a5686ca732cb113f4027d6b",
            jobId: {
            job: "Software Developer Intern",
            company: "Florida Virtual School",
            location: "Orlando, FL, US",
            postDate: "2018-01-13T20:41:28.126Z",
            source: "linkedin",
            desc: "Has the skills, abilities, knowledge and experience to be successful in functional area of expertise; Dedicates time and energy to keeping abreast of the latest information ... disabledperson.com",
            logoUrl: "https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAA3mAAAAJDcwMDcyOGE5LTIwOTMtNDY0ZC04YjI0LTQzMzdjN2E0NzBhMg.png",
            detailUrl: "https://www.linkedin.com/jobs/view/software-developer-intern-at-florida-virtual-school-568821316?trkInfo=searchKeywordString%3ASoftware%2BEngineer%2BIntern%2CsearchLocationString%3A%252C%2B%2Cvertical%3Ajobs%2CpageNum%3A0%2Cposition%3A20%2CMSRPsearchId%3A51569a1a-fca5-4178-a65b-81a3d0674de0&refId=51569a1a-fca5-4178-a65b-81a3d0674de0&trk=jobs_jserp_job_listing_text",
            __v: 0,
            identifier: "2b841ce29d67909ba175c0a9494f2ead",
            _id: "5a5a62043a0cb668a7f87162"
            },
            postDate: "2018-01-13T20:41:28.126Z",
            source: "linkedin",
            status: "unread"
            }]
        return (
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Linkedin" key="1">
                    <List
                        itemLayout="vertical"
                        size="middle"
                        dataSource={dd}
                        renderItem={item => (
                        <List.Item
                            key={item.jobId._id}
                            actions={[<IconText type="star-o" text='save' />, <IconText type="close" text="duplicate" />]}
                            extra={<img width={60} alt="logo" src={item.jobId.logoUrl} />}
                        >
                            <List.Item.Meta
                            title={<a href={item.jobId.detailUrl} target='_blank'>{item.jobId.company}</a>}
                            description={item.jobId.job + ' | ' + item.jobId.postDate.split('T')[0]}
                            />
                            <p>{item.jobId.desc}</p>
                            <p>{}</p>
                        </List.Item>
                        )}
                    />
                </Panel>
                <Panel header="Glassdoor" key="2">
                    <p>glassdoor</p>
                </Panel>
            </Collapse>
        )
    }
}