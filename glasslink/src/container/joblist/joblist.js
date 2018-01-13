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
            _id: "5a585af19ab3bf31506d1b0e",
            userId: "5a5686ca732cb113f4027d6b",
            jobId: {
            job: "Android Developer - Intern",
            company: "Cardon Outreach",
            location: "Columbus, OH, US",
            postDate: "2018-01-09T22:35:27.685Z",
            source: "linkedin",
            desc: "We believe that every team member contributes directly to MedData’s growth and success, and we are constantly searching for new talented, passionate and enthusiastic people who... careers-meddata.icims.com",
            logoUrl: "http://www.linkedin.com/scds/common/u/images/themes/katy/ghosts/company/ghost_company_80x80_v1.png",
            detailUrl: "Android Developer - Intern",
            __v: 0,
            identifier: "18905f7e819f3ac1ec3ea2cc7d4f3cfe",
            _id: "5a54b4c17f665434c3a6314b"
            },
            postDate: "2018-01-09T22:35:27.685Z",
            source: "linkedin",
            status: "unread"
            },
            {
            _id: "5a585af19ab3bf31506d1b0f",
            userId: "5a5686ca732cb113f4027d6b",
            jobId: {
            job: "Software Engineering Returnship - Frontend Web Development, Team F",
            company: "Udemy",
            location: "San Francisco, CA, US",
            postDate: "2018-01-09T22:35:27.685Z",
            source: "linkedin",
            desc: "We are looking for a frontend engineering intern to join us to work on a wide variety of initiatives to improve the Udemy website as well as the development experience for ... jobs.lever.co",
            logoUrl: "https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAIA_wDGAAAAAQAAAAAAAAxmAAAAJGZkOTdkNTJkLWM1MWItNGZlYi04YWEzLTYwNDg0YmJkZmMzYw.png",
            detailUrl: "Software Engineering Returnship - Frontend Web Development, Team F",
            __v: 0,
            identifier: "220310af237f5957591d37d92a4819d4",
            _id: "5a54d7277f665434c3a6320b"
            },
            postDate: "2018-01-09T22:35:27.685Z",
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
                            title={<a href={item.jobId.detailUrl}>{item.jobId.company}</a>}
                            description={item.jobId.job}
                            />
                            {item.jobId.desc}
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