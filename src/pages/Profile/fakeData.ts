import React from "react";
import { random } from "lodash";

export interface DataType {
  key: React.Key;
  name: string;
  age: number;
  birthDateTimestamp: number;
  address: string;
  img: string;
  changeable: boolean;
  isLoading?: boolean;
}

function makeFakeData(): DataType[] {
  const nameList = [
    "Michael",
    "Max",
    "Jack",
    "Joseph",
    "Carol",
    "Christine",
    "Danny",
    "David",
  ];
  const address = "New York No. 1 Lake Park, New York No. 1 Lake Park";
  const result: DataType[] = [];

  for (let i = 0; i < 100; i++) {
    const randomName = nameList[i % nameList.length] + i;
    const randomYear = random(1990, 2020);
    const randomMonth = random(0, 11);
    const randomDay = random(0, 28);
    const birthDateTimestamp = Date.UTC(randomYear, randomMonth, randomDay);

    result.push({
      key: i,
      name: randomName,
      age: 2023 - randomYear,
      birthDateTimestamp,
      address,
      img: `https://fakeimg.pl/100x100/?text=${randomName}`,
      changeable: false,
    });
  }

  return result;
}

export interface ProfileDataLoader {
  profileDataPromise: Promise<DataType[]>;
}

export function getProfileData() {
  return new Promise<DataType[]>((resolve) => {
    return setTimeout(() => {
      resolve(makeFakeData());
    }, 1000);
  });
}
