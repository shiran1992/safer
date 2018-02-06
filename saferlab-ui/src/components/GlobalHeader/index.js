import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Select, Tag, Dropdown, Avatar, Divider, Tooltip, notification } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { connect } from 'dva';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const { Option } = Select;

class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }
  handleLangSelChange = (val) => {
    if (val !== this.props.uiLang) {
      localStorage.setItem('sl-ui-lang', val);
      this.props.dispatch({
        type: 'global/changeLanguage',
        payload: val,
      });
      notification.info({
        message: {
          zh: '界面语言已切换为中文',
          en: 'UI Language Switched to English',
        }[val],
        description: {
          zh: <div><p>但内容页面不能实时切换。<br />要切换界面语言，请先保存尚未提交的数据，<br />然后在下列操作中二选一：</p><ul><li>通过左侧导航栏链接重新进入本页面</li><li>将 URL 的末三个字符改为 `-zh` 后按<kbd>回车</kbd></li></ul></div>,
          en: <div><p>Unfortunately, language of current content cannot be switched at the same time.<br />Please save your data first and then apply one of the following actions to see current content in English:</p><ul><li>Re-enter current page through the navigation sidebar on the left.</li><li>Replace the last 3 characters `-zh` in the URL with `-en` and hit <kbd>Enter</kbd>.</li></ul></div>,
        }[val],
        placement: 'bottomRight',
      });
    }
  }
  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser, collapsed, fetchingNotices, isMobile, logo,
      onNoticeVisibleChange, onMenuClick, onNoticeClear, uiLang
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled><Icon type="user" />
          {{
            zh: '个人中心',
            en: 'My Profile',
          }[uiLang]}
        </Menu.Item>
        <Menu.Item disabled><Icon type="setting" />
          {{
            zh: '设置',
            en: 'Settings',
          }[uiLang]}
        </Menu.Item>
        <Menu.Item key="triggerError"><Icon type="close-circle" />
          {{
            zh: '触发报错',
            en: 'Trigger Exceptions',
          }[uiLang]}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />
          {{
            zh: '登出',
            en: 'Log Out',
          }[uiLang]}
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile && (
          [
            (
              <Link to="/" className={styles.logo} key="logo">
                <img src={logo} alt="logo" width="32" />
              </Link>
            ),
            <Divider type="vertical" key="line" />,
          ]
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={(value) => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={(value) => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <Tooltip title="使用文档">
            <Link
              // target="_blank"
              to="/help-center"
              className={styles.action}
            >
              <Icon type="question-circle-o" />
            </Link>
          </Tooltip>
          <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData['通知']}
              title="通知"
              emptyText="你已查看所有通知"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['消息']}
              title="消息"
              emptyText="您已读完所有消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['待办']}
              title="待办"
              emptyText="你已完成所有待办"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : <Spin size="small" style={{ marginLeft: 8 }} />}
          <Select defaultValue={uiLang} onChange={this.handleLangSelChange}>
            <Option value="zh">中 ZH</Option>
            <Option value="en">英 EN</Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ global }) => {
    return {
      uiLang: global.uiLang,
    };
  }
)(GlobalHeader);
