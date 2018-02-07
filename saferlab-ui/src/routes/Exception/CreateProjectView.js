import React, {createElement} from 'react';
import {Input, DatePicker, Button} from 'antd';
import moment from 'moment';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const {TextArea} = Input;
const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';

export default () => {
  let projectName = '';
  let editorName = '';
  let leaderName = '';
  let time = '';
  let desc = '';
  let tabKey = '1';
  function onChangeProjectName(e) {
    projectName = e.target.value;
  }

  function onChangeEditorName(e) {
    editorName = e.target.value;
  }

  function onChangeLeaderName(e) {
    leaderName = e.target.value;
  }

  function onChangeTime(date, dateString) {
    time = dateString;
  }

  function onChangeDesc(e) {
    desc = e.target.value;
  }

  function onChangeTabs(key) {
    tabKey = key;
  }

  function onSubmit() {
    let obj = {
      projectName: projectName,
      editorName: editorName,
      leaderName: leaderName,
      time: time,
      desc: desc,
      tabKey: tabKey
    };
    console.log(obj);
  }

  return (
    <div style={{display: 'flex'}}>
      <div>
        <div style={styles.itemContainer}>
          <span style={styles.itemTitle}>名称</span>
          <Input style={styles.itemValue} placeholder="名称" onChange={onChangeProjectName}/>
        </div>
        <div style={styles.itemContainer}>
          <span style={styles.itemTitle}>编辑者</span>
          <Input style={styles.itemValue} placeholder="编辑者" onChange={onChangeEditorName}/>
        </div>
        <div style={styles.itemContainer}>
          <span style={styles.itemTitle}>负责人</span>
          <Input style={styles.itemValue} placeholder="负责人" onChange={onChangeLeaderName}/>
        </div>
        <div style={styles.itemContainer}>
          <span style={styles.itemTitle}>项目时间</span>
          <RangePicker
            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat} style={styles.itemValue} onChange={onChangeTime}
          />
        </div>
        <div style={{display: 'flex', margin: 20}}>
          <span style={styles.itemTitle}>描述</span>
          <TextArea style={styles.itemValue} rows={4} onChange={onChangeDesc}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button type="primary" onClick={onSubmit}>提交</Button>
        </div>
      </div>
      <div style={{margin: 20, border: '1px solid #e0e0e0', backgroundColor: 'white'}}>
        <p>负责部门</p>
        <Tabs defaultActiveKey="1" onChange={onChangeTabs}>
          <TabPane tab="实验室1" key="1">我是实验室1</TabPane>
          <TabPane tab="实验室2" key="2">我是实验室2</TabPane>
        </Tabs>
      </div>
    </div>
  );
};

const styles = {
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: 20
  },
  itemTitle: {
    width: 60,
    marginRight: 20
  },
  itemValue: {
    width: '80%'
  }
};
