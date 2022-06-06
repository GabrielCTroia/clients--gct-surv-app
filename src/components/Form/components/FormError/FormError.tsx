import React from "react";

type Props = {
  message: string;
};

export const FormError: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        color: "red",
        paddingLeft: "12px",
        paddingBottom: "16px",
        textAlign: "center",
      }}
    >
      <span>{props.message}</span>
    </div>
  );
};
