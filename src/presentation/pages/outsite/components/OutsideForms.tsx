import { ReactNode } from "react";

const OutsideForms = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-outsideforms">
      <div className="p-4 flex items-center justify-center flex-col">
        {children}
      </div>
    </div>
  );
};
export default OutsideForms;
