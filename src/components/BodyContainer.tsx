import React from "react";

const BodyContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute h-[230px] w-[150px] right-[-75px] top-[20%]">
      {children}
    </div>
  );
};

export default BodyContainer;
