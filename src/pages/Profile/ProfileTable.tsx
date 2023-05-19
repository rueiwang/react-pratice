import { DataType } from "./fakeData";
import { useEffect, useState } from "react";
import useDataApi from "@/customHooks/useDataApi";
import { useTranslation } from "react-i18next";

import { Table, Switch, Popover } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";

interface ProfileTableProps {
  profileData: DataType[];
}

const ProfileTable = ({ profileData }: ProfileTableProps) => {
  const { t } = useTranslation();

  const [tableData, setTableData] = useState<DataType[]>([]);
  const [showTableDataLength, setShowTableDataLength] = useState(0);
  useEffect(() => {
    const profileDataWithLoadingStatus = profileData.map((item) => ({
      ...item,
      isLoading: false,
    }));
    setTableData(profileDataWithLoadingStatus);
    setShowTableDataLength(profileDataWithLoadingStatus.length);
  }, [profileData]);

  const [{ data: switchData, isError }, doSwitchFetch] = useDataApi<any>(
    "",
    {}
  );

  const [switchTarget, setSwitchTarget] = useState<string | null>(null);

  async function switchHandler(name: string, curStatus: boolean) {
    setSwitchTarget(name);
    setTableData((prevData) => {
      return prevData.map((item) => {
        if (item.name === switchTarget) {
          return {
            ...item,
            isLoading: true,
          };
        } else {
          return item;
        }
      });
    });
    doSwitchFetch(
      `https://hn.algolia.com/api/v1/search?query=${name + curStatus}`
    );
  }

  useEffect(() => {
    if (!isError || setSwitchTarget) {
      setTableData((prevData) => {
        return prevData.map((item) => {
          if (item.name === switchTarget) {
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

      setSwitchTarget(null);
    }
  }, [switchData, isError, switchTarget]);

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
            onChange={() => switchHandler(record.name, record.changeable)}
            loading={record.isLoading}
          />
        );
      },
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={tableData}
      scroll={{ x: "max-content" }}
      size="small"
      pagination={{
        total: showTableDataLength,
        showTotal: (total) => t("profilePage.total", { dataLength: total }),
        showSizeChanger: false,
      }}
      onChange={(_pagination, _filters, _sorter, { currentDataSource }) => {
        setShowTableDataLength(currentDataSource.length);
      }}
    />
  );
};

export default ProfileTable;
