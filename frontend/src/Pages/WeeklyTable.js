import React, { useState } from 'react';
import { Layout} from 'antd';
import { getUsers, getWeeks } from '../component/utils';
import { DownOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import WeeklyLog from '../component/WeeklyLog';

const { Content } = Layout;
const getItem = (label, key) => {
    return {
        label,
        key,
        icon : <CalendarOutlined />
    };
};

const defaultContent = '';

const WeeklyTable = () => {
    const [users, setUsers] = useState(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
        return [];
    });
    const [content, setContent] = useState(defaultContent);
    const [weeks, setWeeks] = useState(() => {
        getWeeks().then((res) => {
            setWeeks(res.data);
            setContent(res.data[0]);
        });
        return [];
    });
    const items = weeks.map((week) => {
        return getItem(week, week);
    });

    const handleMenuClick = (e) => {
        if (e.key !== defaultContent){
            setContent(e.key);
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Content
            style={{
                margin: '16px 16px',
            }}
        >
            <Space wrap>
                <Dropdown menu={menuProps} >
                <Button>
                    <Space>
                    {content}
                    <DownOutlined />
                    </Space>
                </Button>
                </Dropdown>
            </Space>
            <WeeklyLog week={content} users={users} />
        </Content>
    );
}

export default WeeklyTable;