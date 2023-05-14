import { Spin  } from "antd";

const Loading = () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip="Loading">
        <div
          className="content"
          style={{
            padding: "50px",
            borderRadius: "4px",
          }}
        />
      </Spin>
    </div>
  );


  export default Loading