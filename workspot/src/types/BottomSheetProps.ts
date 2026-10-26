export type BottomSheetContentMode = "list" | "detail";

export type BottomSheetProps = {
  onReturnToCurrentPosition: (() => void) | null;
  selectedCafeId: number | null;
  onSelectCafe: (id: number) => void;
};
