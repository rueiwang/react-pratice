import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // 使用 i18next-http-backend
  .use(initReactI18next)
  .init({
    backend: {
      // 網頁載入時載入語言檔的位置
      loadPath: "/locale/{{lng}}/{{ns}}.json",
    },
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為React.js 已經做了，就設成 false即可
      escapeValue: false,
    },
    // 讓 t function 不回傳 null 值
    returnNull: false,
  });

export default i18n;
