import { ReactNode } from "react";

function BgCommon({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full rounded-lg dark:bg-[#020817] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] overflow-hidden p-2">
      {children}
    </div>
  );
}

export default BgCommon;
