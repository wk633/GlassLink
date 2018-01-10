import React from 'react';
import { Collapse, Avatar, Badge} from 'antd';
const Panel = Collapse.Panel;

export default class JobList extends React.Component{
    render(){
        return (
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Linkedin" key="1">
                    <p>linkedin</p>
                    <p>linkedin</p>
                </Panel>
                <Panel header="Glassdoor" key="2">
                    <p>glassdoor</p>
                </Panel>
            </Collapse>
        )
    }
}