import { motion } from "framer-motion";
import { CafeList } from "./CafeList"
import { CafeDetail } from "./CafeDetail";
import BottomSheetHeader from "./BottomSheetHeader";
import { BottomSheetContentLayout } from "./BottomSheetContentLayout"
import { useBottomSheet } from "../hooks/useBottomSheet";
import { LocateFixed } from "lucide-react";
import type { BottomSheetProps } from "../types/BottomSheetProps";
import LoadingSpinner from "./LoadingSpinner";
import { ErrorState } from "./ErrorState";

export const BottomSheet = ({ onReturnToCurrentPosition, selectedCafeId, onSelectCafe, cafes, isLoading, isError, onRetry }: BottomSheetProps) => {
  const contentMode = selectedCafeId === null ? "list" : "detail"
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
        {selectedCafeId !== null ? (
          <CafeDetail id={selectedCafeId} />
        ) : isLoading ? ( <LoadingSpinner /> ) : 
        isError ? (
          <ErrorState
            message="카페 목록을 불러오지 못했어요."
            description="잠시 후 다시 시도해주세요."
            onRetry={onRetry}
          />
        ) : cafes.length === 0 ? (
          <p className="p-6 text-center text-body text-text-description">검색 결과가 없습니다.</p>
        ) : (
          <CafeList cafes={cafes} onSelect={onSelectCafe} />
        )}
      </BottomSheetContentLayout>
    </motion.div>
  );
}