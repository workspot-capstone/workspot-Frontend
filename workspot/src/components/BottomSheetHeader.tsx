import type { FC } from "react";

const BottomSheetHeader: FC = () => {
  return (
    <div className="relative h-12 touch-none rounded-t-lg pt-4 pb-1">
      <div className="mx-auto h-1 w-8 rounded-xs bg-[#d0d0d0]" />
    </div>
  );
};

export default BottomSheetHeader;