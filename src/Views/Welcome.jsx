import {Button, Input, Layout, AutoComplete} from "antd";
import {Menu} from "antd";
import {useRef, useState} from "react";
import {Row, Col} from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import {FileSearchOutlined, FolderOpenOutlined} from '@ant-design/icons';
import React from "react";
import Statics from "./Statics.jsx";
import Mytable from "./mytable.jsx";
import Seeker from "./components/Seeker.jsx";
const { Search } = Input;
import {ConfigProvider} from "antd";
import {LogoutOutlined} from '@ant-design/icons';
import {Popconfirm} from "antd";

const iconsForMenu = [
    FileSearchOutlined,
    FolderOpenOutlined,
];

const iconLabels = [
    'Buscar estación',
    'Ver mis favoritos',
];

function renderMenuItems(icons, labels) {

    if (icons.length !== labels.length) {
        console.warn('Icons and labels length mismatch');
    }

    return icons.map((IconComponent, index) => ({
        key: String(index + 1),
        icon: React.createElement(IconComponent),
        label: labels[index] ?? `Icono ${index + 1}`,

    }));
}

export default function welcome({dataUser}) {

    const [collapsed, setCollapsed] = useState(false);
    const [index, setIndex] = useState("1");
    const [channelParser, setChannelParser] = useState("");
    const [resultsApi, setResultsApi] = useState([]);

    const generatorReactJSX = () => {
        if(index === "1"){
            return <Mytable resultsApi={resultsApi} setChannelParser={setChannelParser}/>
        }else if(index === "2"){
            return <Statics/>
        }else if(index === "3"){

        }

    }
    return (
        <>
            <Layout style={{ height: '100vh' }}>

                <ConfigProvider theme={{
                    components: {
                        Layout: {
                            siderBg: '#141313', // fondo del Sider
                            triggerBg: '#abfb68', // fondo del botón de collapse
                            triggerColor: 'black', // color del ícono (la flechita)
                        },
                    },
                }}>
                <Sider style={{marginLeft: 0, height: '100vh', backgroundColor: '#141313'}} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>

                    <ConfigProvider
                        theme={{
                            // para light no hace falta poner algoritmo: usa por defecto defaultAlgorithm
                            components: {
                                Menu: {
                                    // Component Tokens para light theme:
                                    itemBg: 'black',               // fondo normal :contentReference[oaicite:0]{index=0}
                                    itemColor: 'white',   // texto normal :contentReference[oaicite:1]{index=1}
                                    itemHoverBg: 'rgba(24,144,255,0.1)',  // fondo al hover :contentReference[oaicite:2]{index=2}
                                    itemHoverColor: '#1890ff',           // texto al hover :contentReference[oaicite:3]{index=3}
                                    itemSelectedBg: 'rgba(136,235,53,0.9)', // fondo seleccionado :contentReference[oaicite:4]{index=4}
                                    itemSelectedColor: 'purple',         // texto seleccionado :contentReference[oaicite:5]{index=5}
                                },
                            },
                        }}
                    >
                        <Menu
                            theme="light"
                            mode="inline"
                            selectedKeys={[index]}
                            onClick={({ key }) => setIndex(key)}
                            items={renderMenuItems(iconsForMenu, iconLabels)}
                        />
                    </ConfigProvider>

                </Sider>
                </ConfigProvider>

                <Layout>
                    <Header style={{backgroundColor: '#141313'}}>
                        <Row>
                            <Col span={12}>
                                <h1 style={{color: 'white', marginTop: 0}}>Welcome {dataUser.userEmail}</h1>
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <Col span={20} >
                                        <Seeker setChannelParser={setChannelParser} setResultsApi={setResultsApi} ></Seeker>
                                    </Col>
                                    <Col span={4} style={{paddingLeft: 10}}>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Header>

                    <Content style={{backgroundColor: '#1e1e1e'}}>

                        {
                            generatorReactJSX()
                        }

                    </Content>

                    <Footer style={{backgroundColor: 'black', padding: 1, width: '100%', height: '5vh'}}>

                        <Row>
                            <Col span={12} >
                                <audio
                                    /*ref={audioRef}*/
                                    src={channelParser}
                                    controls
                                    style={{marginLeft: '20%',width: '75vw' , height: '4vh', marginTop:"0", position: "absolute"}}
                                    preload="auto"
                                    autoPlay={true}
                                />

                                <Popconfirm
                                    title="Cerrar Sesión"
                                    description="¿Estas seguro de cerrar sesión?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => {
                                        localStorage.removeItem("token");
                                        window.location.href = "/";
                                    }}
                                >
                                    <Button danger style={{position: "absolute" ,marginLeft: '86vw' ,width: '3vw', height: '4vh', marginTop:"0.0vh", marginRight: '0'}} icon={<LogoutOutlined />}></Button>
                                </Popconfirm>

                            </Col>
                        </Row>

                    </Footer>

                </Layout>

            </Layout>

        </>
    );
}