import { motion } from "framer-motion";
import { mockCafes } from "../mocks/mockCafes"
import { CafeList } from "./CafeList"
import { CafeDetail } from "./CafeDetail";
import BottomSheetHeader from "./BottomSheetHeader";
import { BottomSheetContentLayout } from "./BottomSheetContentLayout"
import { useBottomSheet } from "../hooks/useBottomSheet";
import { useState } from "react";
import { LocateFixed } from "lucide-react";
import type { BottomSheetProps } from "../types/BottomSheetProps";

export const BottomSheet = ({ onReturnToCurrentPosition }: BottomSheetProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const contentMode = selectedId === null ? "list" : "detail"
  const { sheet, content, y } = useBottomSheet(contentMode); 
  return (
    <motion.div
      ref={sheet}
      style={{ y }}
      className="fixed inset-x-0 top-0 z-10 flex h-[calc(100dvh-60px)] flex-col rounded-t-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)]"
    >
      <button
        type="button"
        aria-label="현재 위치로 이동"
        title="현재 위치로 이동"
        disabled={!onReturnToCurrentPosition}
        onClick={onReturnToCurrentPosition ?? undefined}
        className="absolute -top-14 right-4 z-20 rounded-full bg-white p-3 text-primary shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LocateFixed aria-hidden="true" />
      </button>
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