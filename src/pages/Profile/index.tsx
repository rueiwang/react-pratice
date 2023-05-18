import dataList, { DataType } from "./fakeData";
import { useEffect, useState } from "react";
import useDataApi from "@/customHooks/useDataApi";
import { useTranslation } from "react-i18next";

import TitleBar from "@/components/Title";

import { UserOutlined } from "@ant-design/icons";
import { Table, Switch, Popover } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";

const Profile = () => {
  const { t } = useTranslation();
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

      // reset URL 因為開或關都會打一樣的，沒有重置就無法重打
      doSwitchFetch("");
    }
  }, [switchData, isError, doSwitchFetch]);

  // first column: fix, filter and search, popover
  // age column: sort
  // birthDate column: format show text
  // address column: show ellipse
  // last column: Switch and call api
  const columns: ColumnsType<DataType> = [
    {
      title: t("profilePage.name"),
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
      title: t("profilePage.age"),
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: t("profilePage.birthDate"),
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
      title: t("profilePage.address"),
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: `${t("profilePage.address")}1`,
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: `${t("profilePage.address")}2`,
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: `${t("profilePage.address")}3`,
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: `${t("profilePage.address")}4`,
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: `${t("profilePage.changeable")}`,
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
      <TitleBar title={t("protectedLayout.profile")} icon={<UserOutlined />} />
      <div className="Profile__content">
        <Table
          columns={columns}
          dataSource={tableData}
          scroll={{ x: "max-content" }}
          size="small"
          pagination={{
            total: tableData.length,
            showTotal: (total) => t("profilePage.total", { dataLength: total }),
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
