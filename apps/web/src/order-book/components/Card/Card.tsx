import type { FC } from "react";

export const Card: FC = ({ children }) => {
  return <div className="rounded-lg p-6 shadow bg-white">{children}</div>;
};
