import React, { Component } from "react";
import {
    message,
    Form,
    Upload,
} from "antd";
import {
    InboxOutlined
} from "@ant-design/icons";

class UploadExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            needsupdate: true,
            api: this.props.api
        };
    }

    formItemLayout = {
        labelCol: {
            xs: { span: 12 },
            sm: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 48 },
            sm: { span: 12 }
        }
    };

    onFileUpload = (info) => {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
            this.setState({ Files: info.fileList });
        }
        if (status === "done") {
            message.success(`${info.file.name} file analysed successfully.`);
            this.setState({
                needsupdate: false,
                data: info.file.response.tabledata,
                updateColumns: true,
                buttondisabled: info.file.response.buttondisabled,
                templatedisabled: true
            });
        } else if (status === "error") {
            message.error(`${info.file.name} file analysis failed.`);
        }
    };

    propsUpload = {
        name: ["Upload", "file"],
        multiple: false,
        action: "/upload/fileSubmit",
        method: "POST",
        onChange: this.onFileUpload,
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 }
        }
    };

    success = () => {
        message.success("Data Submitted", 5);
    };

    declined = () => {
        message.error("Something went wrong!", 5);
    };

    componentDidUpdate(props) {
        if (this.state.api !== this.props.api) {
            this.setState({ needsupdate: true, api: this.props.api });
        };
    }

    render() {
        return (<div>
            <Form
                id="SubmitData"
                onFieldsChange={this.fieldChange}
                onFinish={this.onFinish}
            >
                <Form.Item {...this.formItemLayout} label="Upload File">
                    <Upload
                        {...this.propsUpload}
                        bodyStyle={{ backgroundColor: "#e6f7ff" }}
                    >
                        <p
                            className="ant-upload-drag-icon"
                            style={{
                                fontSize: 30,
                                color: "#40a9ff",
                                textAlign: "center",
                                backgroundColor: "#e6f7ff",
                                width: 600
                            }}
                        >
                            <InboxOutlined />
                        </p>
                        <p
                            className="ant-upload-text"
                            style={{
                                color: "#40a9ff",
                                textAlign: "center",
                                backgroundColor: "#e6f7ff"
                            }}
                        >
                            Click or drag files to this area to upload
                                </p>
                        <p className="ant-upload-hint"> </p>
                    </Upload>
                </Form.Item>
            </Form>
        </div>
        );
    }
}

export default UploadExample;
