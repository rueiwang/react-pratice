import { random } from "lodash";

export interface ChartData {
  power: number;
  frequency: number;
  sbspm: number;
  timestamp: number;
  basic?: number;
}

// 製作以一分鐘為間隔的 timestamp, 以 2023/05/08 00:00 起
// Date.UTC(year, monthIndex, day, hour: 0 - 23, minute: 0 - 59)
export function makeFakeData(): ChartData[] {
  let hour = 0;
  let minute = 0;
  let power = random(5000, 6000);
  let frequency = parseFloat(random(59, 60.5).toFixed(1));
  let sbspm = random(20, 60);

  const result = [];
  for (let i = 0; i < 1440; i++) {
    const timestamp = Date.UTC(2023, 4, 8, hour, minute);

    result.push({
      timestamp,
      power,
      frequency,
      sbspm,
      basic: 0,
    });

    const passMinutes = (i + 1) % 60;
    minute = passMinutes;
    if (passMinutes === 0) {
      hour += (i + 1) % 60 === 0 ? 1 : 0;
      power = random(5000, 6000);
      frequency = parseFloat(random(59, 60.5).toFixed(1));
      sbspm = random(20, 60);
    }
  }

  return result;
}

export interface ChartDataLoader {
  chartDataPromise: Promise<ChartData[]>;
}

export function getChartData() {
  return new Promise<ChartData[]>((resolve) => {
    return setTimeout(() => {
      resolve(makeFakeData());
    }, 1000);
  });
}
