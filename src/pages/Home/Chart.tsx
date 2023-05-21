import { useEffect, useRef, useState } from "react";
import { ChartData, getChartData } from "./fakeData";
import Loading from "@/components/Loading";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartProp {
  initialData: ChartData[]; // 承接 route loader fetch 的資料
  param: string | null; // parent select value change 時要 call api 的參數
}

interface AreaSeriesData {
  x: number;
  y: number;
}

interface DataForOptions {
  categories: number[];
  frequency: AreaSeriesData[];
  power: AreaSeriesData[];
  sbspm: AreaSeriesData[];
}

const Chart = ({ initialData, param }: ChartProp) => {
  const [chartData, setChartData] = useState<ChartData[]>(initialData);
  const [dataForOptions, setDataForOptions] = useState<DataForOptions>({
    categories: [],
    frequency: [],
    power: [],
    sbspm: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) return;
    setIsLoading(true);
    getChartData().then((data) => {
      setChartData(data);
      setIsLoading(false);
    });
  }, [param]);

  // 監聽 chartData 變化來 set dataForOptions
  useEffect(() => {
    const newOptionData: DataForOptions = {
      categories: [],
      frequency: [],
      power: [],
      sbspm: [],
    };
    chartData.forEach((item) => {
      const x = item.timestamp;
      newOptionData.categories.push(x);
      newOptionData.frequency.push({ x, y: item.frequency });
      newOptionData.power.push({ x, y: item.power });
      newOptionData.sbspm.push({ x, y: item.sbspm });
    });

    setDataForOptions(newOptionData);
  }, [chartData]);

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
      categories: dataForOptions.categories,
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
        data: dataForOptions.frequency,
        tooltip: {
          valueSuffix: " Hz",
        },
        yAxis: 0,
        color: "#85d742",
      },
      {
        name: "功率",
        data: dataForOptions.power,
        tooltip: {
          valueSuffix: " kW",
        },
        yAxis: 1,
        color: "#4593ff",
      },
      {
        name: "SBSPM",
        data: dataForOptions.sbspm,
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

  useEffect(() => {
    isInitialized.current = true;
    return () => {
      isInitialized.current = false;
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
