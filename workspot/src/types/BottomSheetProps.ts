export type BottomSheetContentMode = "list" | "detail";

export type BottomSheetProps = {
  onReturnToCurrentPosition: (() => void) | null;
};
