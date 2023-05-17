import dataList, { DataType } from "./fakeData";
import { useEffect, useState } from "react";
import useDataApi from "@/customHooks/useDataApi";

import TitleBar from "@/components/Title";

import { UserOutlined } from "@ant-design/icons";
import { Table, Switch, Popover } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";

const Profile = () => {
  const [tableData, setTableData] = useState(
    dataList.map((item) => ({ ...item, isLoading: false }))
  );
  const [{ data: switchData, isError }, doSwitchFetch] = useDataApi<any>(
    "",
    {}
  );

  async function switchHandler(name: string) {
    // 模仿 API 成功後修改對應物件狀態
    setTableData((prevData) => {
      return prevData.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            isLoading: true,
          };
        } else {
          return item;
        }
      });
    });
    doSwitchFetch(`https://hn.algolia.com/api/v1/search?query=${name}`);
  }

  useEffect(() => {
    console.log(switchData);
    if (!isError) {
      setTableData((prevData) => {
        return prevData.map((item) => {
          if (item.name === switchData.query) {
            return {
              ...item,
              changeable: !item.changeable,
              isLoading: false,
            };
          } else {
            return item;
          }
        });
      });
    }
  }, [switchData]);

  // first column: fix, filter and search, popover
  // age column: sort
  // birthDate column: format show text
  // address column: show ellipse
  // last column: Switch and call api
  const columns: ColumnsType<DataType> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      filters: [
        {
          text: "M-",
          value: "m",
        },
        {
          text: "J-",
          value: "j",
        },
        {
          text: "C-",
          value: "c",
        },
        {
          text: "D-",
          value: "d",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => {
        const curValue = value.toString();
        return record.name.toLowerCase().startsWith(curValue.toLowerCase());
      },
      width: 100,
      fixed: "left",
      render: (name, record) => (
        <Popover
          content={
            <div className="Profile__name-popoverContent">
              <img src={record.img} alt={name} />
            </div>
          }
          trigger="hover"
        >
          {name}
        </Popover>
      ),
    },
    {
      title: "年齡",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "生日",
      dataIndex: "birthDateTimestamp",
      render: (birthDateTimestamp) => {
        const formatString = new Date(birthDateTimestamp)
          .toISOString()
          .split("T")[0]
          .replaceAll("-", "/");
        return <>{formatString}</>;
      },
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "地址1",
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "地址2",
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "地址3",
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "地址4",
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "是否轉供",
      dataIndex: "changeable",
      key: "changeable",
      render: (changeable, record) => {
        return (
          <Switch
            size="small"
            checked={changeable}
            onChange={() => switchHandler(record.name)}
            loading={record.isLoading}
          />
        );
      },
    },
  ];

  return (
    <div className="Profile">
      <TitleBar title="個人資訊" icon={<UserOutlined />} />
      <div className="Profile__content">
        <Table
          columns={columns}
          dataSource={tableData}
          scroll={{ x: "max-content" }}
          size="small"
          pagination={{
            total: tableData.length,
            showTotal: (total) => `共 ${total} 筆`,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
