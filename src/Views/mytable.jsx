import React from 'react';
import {Button, Space, Table, Tag} from 'antd';
const { Column, ColumnGroup } = Table;
import { PlayCircleOutlined } from '@ant-design/icons';
import RadioAPI from "../api/RadioAPI.js";
import{HeartOutlined } from '@ant-design/icons';
const instanceAPIRadio = new RadioAPI();

export default function Mytable({resultsApi, setChannelParser}) {

    function changeStation(url){
        const channel = url.replaceAll(" ", "").split("/").pop();

        instanceAPIRadio.parseChannel(channel).then(e => {
            setChannelParser(e.url);
        }).catch(e => {
            console.log(e);
        });
        console.log("online "+url)

    }

    return (
        <div style={{padding: 20}}>
            <Table dataSource={resultsApi}>


                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Score" dataIndex="score" key="score" />
                <Column title="Subtitle" dataIndex="subtitle" key="subtitle" />
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="URI" dataIndex="url" key="url" render={
                    (url) => (
                        <Space size="middle">
                            <Button key={url} type="primary" icon={<PlayCircleOutlined />} onClick={event => changeStation(url)} style={{backgroundColor: '#96db12'}}> Play </Button>
                        </Space>
                    )
                }/>

                <Column
                    align={"center"}
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button icon={<HeartOutlined />}>Save</Button>
                        </Space>
                    )}
                />
            </Table>

        </div>
    );
}