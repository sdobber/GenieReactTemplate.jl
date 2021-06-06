import React, { useState } from "react";
import { render } from "react-dom";
import { Layout, Menu, Divider, Space } from "antd";
import {
  FormOutlined,
  EyeOutlined,
  PlaySquareOutlined,
  EditOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";
import "./index.css";

import UploadExample from "./uploadexample.js";
import DropdownTable from "./ddtableexample.js";

const { Header, Content, Footer, Sider } = Layout;

const App = (props) => {

  //const serveradress = "//127.0.0.1:8000"; // use this for development
  const serveradress = ""; // use this for building the project
  const API = serveradress + "/api";

  const [selectedMenuItem, setSelectedMenuItem] = useState("Menu1");
  const componentsSwitch = (key) => {
    switch (key) {
      case "Menu1":
        return (
          <div
            className="site-foreground"
            style={{ width: 800, margin: "20px auto" }}
          >
            <UploadExample api={API} />
          </div>
        );
      case "Menu2":
        return (
          <div
            className="site-foreground"
            style={{ width: 800, margin: "20px auto" }}
          >
            <DropdownTable api={API} />
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
            Upload Example
          </Menu.Item>
          <Divider orientation="left" style={{ color: "white" }}>
            <EyeOutlined /> Divider
          </Divider>
          <Menu.Item key="Menu2" icon={<PlaySquareOutlined />}>
            Table Example
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
