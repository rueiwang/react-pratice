import { makeFakeData } from "./fakeData";
import Chart from "./Chart";

import TitleBar from "@/components/Title";
import { Card, Space } from "antd";
import { HomeOutlined, DoubleRightOutlined } from "@ant-design/icons";
import "./style.scss";

const Home = () => {
  const chartData = makeFakeData();
  return (
    <div className="Home">
      <TitleBar title="首頁" icon={<HomeOutlined />} />
      <div className="Home__content">
        <section className="announcement">
          <div className="sectionTitle">佈告欄</div>
          <div className="announcement__board">
            <Space size={16}>
              <Card
                title="警示"
                headStyle={{
                  color: "#f55b5b",
                }}
              >
                <div>暫無資料</div>
              </Card>
              <Card
                title="契約組合"
                extra={
                  <a href="#">
                    更多
                    <DoubleRightOutlined />
                  </a>
                }
                headStyle={{
                  color: "#6bcf48",
                }}
              >
                <div>
                  <div>契約#000001：業務員修改預約轉供日</div>
                  <div>2022/01/03</div>
                </div>
              </Card>
            </Space>
          </div>
        </section>
        <section className="highChart">
          <div className="sectionTitle">全案場轉供走勢圖</div>
          <Chart data={chartData} />
        </section>
      </div>
    </div>
  );
};
export default Home;
