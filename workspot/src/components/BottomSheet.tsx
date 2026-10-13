import { motion } from "framer-motion";
import { mockCafes } from "../mocks/mockCafes"
import { CafeList } from "./CafeList"
import { CafeDetail } from "./CafeDetail";
import BottomSheetHeader from "./BottomSheetHeader";
import { BottomSheetContentLayout } from "./BottomSheetContentLayout"
import { useBottomSheet } from "../hooks/useBottomSheet";
import { useState } from "react";

export const BottomSheet = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { sheet, content, y } = useBottomSheet(); 
  return (
    <motion.div
      ref={sheet}
      style={{ y }}
      className="fixed inset-x-0 top-0 z-10 flex h-[calc(100dvh-60px)] flex-col rounded-t-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)]"
    >
      <BottomSheetHeader />
      <BottomSheetContentLayout contentRef={content}>
        {selectedId !== null ? (
          <CafeDetail id={selectedId} />
        ) : (
          <CafeList cafes={mockCafes} onSelect={setSelectedId} />
        )}
      </BottomSheetContentLayout>
    </motion.div>
  );
}