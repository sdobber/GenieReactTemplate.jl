import React, { useState } from "react";
import { render } from "react-dom";
import { Layout, Menu, Divider, Space } from "antd";
import {
  TeamOutlined,
  PhoneOutlined,
  FormOutlined,
  EyeOutlined,
  MailOutlined,
  UserOutlined,
  ConsoleSqlOutlined,
  PlusCircleOutlined,
  CloseOutlined,
  PlaySquareOutlined,
  EditOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";
import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

const props = { ID: 0, element: 5 };

const App = (props) => {
  const serveradress = "";//"//127.0.0.1:8000"; // change this for production

  const API = serveradress + "/api/";

  const [selectedMenuItem, setSelectedMenuItem] = useState("Menu1");
  const componentsSwitch = (key) => {
    switch (key) {
      case "Menu1":
        return (
          <div
            className="site-foreground"
            style={{ width: 800, margin: "20px auto" }}
          >

          </div>
        );
      case "Menu2":
        return (
          <div
            className="site-foreground"
            style={{ width: 800, margin: "20px auto" }}
          >

          </div>
        );
      default:
        break;
    }
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["Menu1"]}
          selectedKeys={selectedMenuItem}
          onSelect={(e) => setSelectedMenuItem(e.key)}
        >
          <Divider orientation="left" style={{ color: "white" }}>
            <FormOutlined /> Divider
          </Divider>
          <Menu.Item key="Menu1" icon={<EditOutlined />}>
            Menu 1
          </Menu.Item>
          <Divider orientation="left" style={{ color: "white" }}>
            <EyeOutlined /> Divider
          </Divider>
          <Menu.Item key="Menu2" icon={<PlaySquareOutlined />}>
            Menu 2
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ textAlign: "center", color: "white", fontSize: "24px" }}
        >
          <Space>
            <b>Page Title</b>
          </Space>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {componentsSwitch(selectedMenuItem)}
            <div style={{ marginTop: 16 }}></div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Powered by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

render(<App input={props} />, document.getElementById("root"));
