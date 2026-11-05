import type { CafeListProps } from './CafeProps';

export type BottomSheetContentMode = "list" | "detail";

export type BottomSheetProps = {
  onReturnToCurrentPosition: (() => void) | null;
  selectedCafeId: number | null;
  onSelectCafe: (id: number) => void;
  cafes: CafeListProps[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};
