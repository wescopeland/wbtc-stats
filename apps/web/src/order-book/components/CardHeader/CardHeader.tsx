import type { FC } from "react";

export const CardHeader: FC = ({ children }) => {
  return <h2 className="uppercase font-semibold mb-4 text-xs">{children}</h2>;
};
