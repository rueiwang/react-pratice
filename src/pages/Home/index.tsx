import { Suspense, useState } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChartDataLoader } from "@/pages/Home/fakeData";
import Chart from "./Chart";

import TitleBar from "@/components/Title";
import { Card, Space, Select } from "antd";
import { HomeOutlined, DoubleRightOutlined } from "@ant-design/icons";
import "./style.scss";
import Loading from "@/components/Loading";

const Home = () => {
  const { chartDataPromise } = useLoaderData() as ChartDataLoader;
  const { t } = useTranslation();
  const [chartParam, setChartParam] = useState("2023");
  return (
    <div className="Home">
      <TitleBar title={t("protectedLayout.home")} icon={<HomeOutlined />} />
      <div className="Home__content">
        <section className="announcement">
          <div className="sectionTitle">{t("homePage.bulletinBoard")}</div>
          <div className="announcement__board">
            <Space size={16}>
              <Card
                title={t("homePage.warn")}
                headStyle={{
                  color: "#f55b5b",
                }}
              >
                <div>{t("homePage.noData")}</div>
              </Card>
              <Card
                title={t("homePage.combination")}
                extra={
                  <a href="#">
                    {t("homePage.more")}
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
          <div
            className="sectionTitle"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>{t("homePage.chart")}</div>
            <Select
              className="Select-lang"
              defaultValue="en"
              onChange={(value) => {
                setChartParam(value);
              }}
              options={[
                { label: "2023", value: "2023" },
                { label: "2022", value: "2022" },
              ]}
              value={chartParam}
            />
          </div>

          <Suspense fallback={<Loading />}>
            <Await
              resolve={chartDataPromise}
              errorElement={<>Wrong</>}
              children={(chartData) => (
                <Chart initialData={chartData} param={chartParam} />
              )}
            ></Await>
          </Suspense>
        </section>
      </div>
    </div>
  );
};
export default Home;
