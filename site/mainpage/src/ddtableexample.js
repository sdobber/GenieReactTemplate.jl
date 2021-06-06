import React, { Component } from "react";
import { Table, message, Select, Form } from "antd";

class DropdownTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needsupdate: true,
      updateColumns: false,
      dataSource: [],
      columns: [],
      buttondisabled: false,
      api: this.props.api,
      DDData: [{ id: 1, value: "Entry 1" }]
    };
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  };

  tableLayout = {
    labelCol: {
      xs: { span: 48 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 48 },
      sm: { span: 12 }
    }
  };

  filterData = (data, key) => {
    const columnData = [...new Set(data.map(item => item[key]))]; // trick to get unique values out
    return columnData.map(item => ({
      text: item,
      value: item,
    }));
  };

  makeSorter = (key) => {
    function sorter(a, b) {
      if (key === 'Number') {
        return a[key] - b[key]
      } else {
        const s1 = a[key] === null ? '+' : a[key];
        const s2 = b[key] === null ? '+' : b[key];
        return s1.localeCompare(s2)
      }
    };
    return sorter
  };

  updateColumns = () => {
    const cols = this.state.columns.map(item => ({
      title: item.title,
      dataIndex: item.dataIndex,
      key: item.key,
      sortDirections: ['ascend', 'descend'],
      filters: this.filterData(this.state.dataSource, item.key),
      onFilter: (value, record) => record[item.key].indexOf(value) === 0,
      sorter: (a, b) => this.makeSorter(item.dataIndex)(a, b),
    }));
    this.setState({
      columns: cols,
      updateColumns: false
    })
  };

  async getData() {
    const data = await fetch(this.props.api + "/getData");
    const response = await data.json();
    this.setState({
      needsupdate: false,
      DDData: response.DDData,
    });
  }

  fieldChange = (event) => {
    fetch(this.props.api + "/formSubmit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ DataRequest: event[0].value })
    }).then((res) => {
      if (!res.ok) {
        this.declined();
      } else {
        this.success();
      }
      return res.json();
    }).then((data) => {
      this.setState({
        needsupdate: false,
        dataSource: data.dataSource,
        columns: data.columns,
        updateColumns: true
      });
    }
    );
  };

  success = () => {
    message.success("Table updated!", 5);
  };

  declined = () => {
    message.error("Something went wrong!", 5);
  };

  componentDidUpdate(props) {
    if (this.state.api !== this.props.api) {
      this.setState({ needsupdate: true, api: this.props.api });
    }
    ;
  }

  render() {
    if (this.state.needsupdate) {
      this.getData();
    }
    if (this.state.updateColumns && !this.state.needsupdate) {
      this.updateColumns();
    }
    return (
      <Form
        id="Select"
        onFieldsChange={this.fieldChange}
      >
        <Form.Item
          {...this.formItemLayout}
          label="Select Data"
          name={["Select", "Data"]}
        >
          <Select {...this.formItemLayout}>
            {this.state.DDData.map((dict) => (
              <Select.Option key={dict.id} value={dict.id}>
                {dict.value}
              </Select.Option>
            ))}
            ;
          </Select>
        </Form.Item>

        <Table dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination={{
            pageSizeOptions: ["20", "50"],
            showSizeChanger: true,
            defaultPageSize: 20
          }} />

      </Form>

    );
  }
}

export default DropdownTable;
