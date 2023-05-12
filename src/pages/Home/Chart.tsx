import { ChartData } from "./fakeData";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartProp {
  data: ChartData[];
}

interface AreaSeriesData {
  x: number;
  y: number;
}

const Chart = ({ data }: ChartProp) => {
  const categories: number[] = [];
  const frequency: AreaSeriesData[] = [];
  const power: AreaSeriesData[] = [];
  const sbspm: AreaSeriesData[] = [];

  data.forEach((item) => {
    const x = item.timestamp;

    categories.push(x);
    frequency.push({ x, y: item.frequency });
    power.push({ x, y: item.power });
    sbspm.push({ x, y: item.sbspm });
  });

  const options = {
    chart: {
      // 滑鼠拖拉可放大
      zoomType: "xy",
      type: "area",
    },
    // 共用設定
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
        },
        fillOpacity: 0,
        turboThreshold: 1440,
        lineWidth: 2,
      },
    },
    // x 軸顯示內容
    xAxis: {
      type: "datetime",
      categories: categories,
      labels: {
        style: {
          fontSize: "0.4rem",
          color: "#dadce2",
        },
        format: "{value:%H:%M}",
        align: "center",
        distance: 0,
      },
      // 最小 zoom in 到一分鐘
      minRange: 60 * 60 * 1000,
      // 顯示每一小時
      minTickInterval: 60 * 60 * 1000,
      tickPixelInterval: null,
      tickmarkPlacement: "on",
      lineWidth: 0,
      tickWidth: 1,
      tickLength: 5,
      tickColor: "#dadce2",
    },
    // y 軸顯示內容：預設從最左往外延伸、設定 opposite 變成從右邊往外延伸
    yAxis: [
      {
        title: {
          text: "頻率 / 頻率基準 / Hz",
          style: {
            color: "#85d742",
          },
        },
        labels: {
          style: {
            color: "#85d742",
          },
          distance: 3,
        },
        opposite: true,
        max: 60.6,
        min: 59.4,
        tickAmount: 5,
        gridLineColor: "#dadce2",
      },
      {
        title: {
          text: "kW / 功率",
          style: {
            color: "#4593ff",
          },
        },
        labels: {
          style: {
            color: "#4593ff",
          },
          distance: 3,
          // type ref: https://api.highcharts.com/class-reference/Highcharts#.AxisLabelsFormatterCallbackFunction
          formatter: function (
            this: Highcharts.AxisLabelsFormatterContextObject
          ): string {
            return this.value.toLocaleString();
          },
        },
        max: 6000,
        min: -6000,
        tickAmount: 5,
        gridLineColor: "#dadce2",
      },
      {
        title: {
          text: "SBSPM / %",
          style: {
            color: "#ee4d7e",
          },
        },
        labels: {
          style: {
            color: "#ee4d7e",
          },
          distance: 3,
        },
        opposite: true,
        max: 100,
        min: 0,
        tickAmount: 5,
        gridLineColor: "#dadce2",
      },
    ],
    // 資料內容
    series: [
      {
        name: "頻率",
        // yAxis: 1,
        data: frequency,
        tooltip: {
          valueSuffix: " Hz",
        },
        yAxis: 0,
        color: "#85d742",
      },
      {
        name: "功率",
        data: power,
        tooltip: {
          valueSuffix: " kW",
        },
        yAxis: 1,
        color: "#4593ff",
      },
      {
        name: "SBSPM",
        data: sbspm,
        tooltip: {
          valueSuffix: " %",
        },
        yAxis: 2,
        color: "#ee4d7e",
      },
    ],
    // 隱藏標題
    title: {
      style: { display: "none" },
    },
    // 取消無障礙
    accessibility: {
      enabled: false,
    },
    // 說明區塊
    legend: {},
    tooltip: {
      // better for table/mobile
      shared: true,
      xDateFormat: "%H:%M",
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
