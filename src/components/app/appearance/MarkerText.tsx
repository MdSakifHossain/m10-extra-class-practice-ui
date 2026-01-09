import React from "react";

const MarkerText = ({ className, children }) => {
  return (
    <p
      className={`bg-primary text-background dark:text-foreground ${className}`}
    >
      {children}
    </p>
  );
};

export default MarkerText;
