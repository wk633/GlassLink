import React from 'react';
import { Collapse, Avatar, Badge, List, Icon, Pagination} from 'antd';
import {connect} from 'react-redux';
import {getLinkedinJobList, changeLinkedinPage} from '../../reducer/user';

const Panel = Collapse.Panel;
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

@connect(
    state=>state.user,
    {getLinkedinJobList, changeLinkedinPage}
)
class JobList extends React.Component{
    componentDidMount(){
        this.props.getLinkedinJobList();
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }
    changePageHandler(page){
        console.log(this);
        this.props.changeLinkedinPage(page);
        window.scrollTo({"behavior": "smooth", "top": 100});
    }
    render(){    
        return (
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Linkedin" key="1">
                    <List
                        itemLayout="vertical"
                        size="middle"
                        dataSource={this.props.currentLinkedin}
                        renderItem={item => (
                        <List.Item
                            key={item.jobId._id}
                            actions={[<IconText type="star-o" text='save' />]}
                            extra={<img width={60} alt="logo" src={item.jobId.logoUrl} />}
                        >
                            <List.Item.Meta
                            title={<a href={item.jobId.detailUrl} target='_blank'>{item.jobId.company + ' | ' + item.jobId.job}</a>}
                            description={item.jobId.location + ' | ' + item.jobId.postDate.split('T')[0]}
                            />
                            <p>{item.jobId.desc}</p>
                        </List.Item>
                        )}
                    />
                    <Pagination defaultCurrent={1} current={this.props.curLinkedinPage} pageSize={10} total={this.props.linkedin.length} onChange={this.changePageHandler.bind(this)}/>
                </Panel>
                <Panel header="Glassdoor" key="2">
                    <p>glassdoor</p>
                </Panel>
            </Collapse>
        )
    }
}

export default JobList;