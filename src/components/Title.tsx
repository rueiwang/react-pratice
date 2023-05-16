import React from "react";
import { theme } from "antd";
const {useToken} = theme 

interface TitleBarProps {
  title: string;
  icon: React.ReactNode;
}

const TitleBar = ({ title, icon }: TitleBarProps) => (
  <div
    className="TitleBar"
    style={{
      color: "#444c80",
      backgroundColor: useToken().token.controlItemBgActive,
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      height: "40px",
      fontWeight: "bold",
      paddingLeft: "16px",
      boxShadow: "0px 0 3px rgba(0, 0, 0, 0.3)",
    }}
  >
    <div
      style={{
        marginRight: "10px",
      }}
    >
      {icon}
    </div>
    {title}
  </div>
);

export default TitleBar;
