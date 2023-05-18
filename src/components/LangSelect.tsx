import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const LangSelect = () => {
  const { t, i18n } = useTranslation();
  function initLng() {
    return i18n.language;
  }

  const lngOptions = [
    {
      value: "en",
      label: t("languages.en"),
    },
    {
      value: "zhTw",
      label: t("languages.zhTw"),
    },
  ];
  const [lng, setLng] = useState(() => initLng());
  function lngChange(value: string) {
    setLng(value);
  }

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    i18n.changeLanguage(lng).then(() => {
      setIsLoading(false);
    });
  }, [lng, i18n]);

  return (
    <Select
      className="Select-lang"
      defaultValue="en"
      onChange={lngChange}
      options={lngOptions}
      value={lng}
      loading={isLoading}
    />
  );
};

export default LangSelect;
