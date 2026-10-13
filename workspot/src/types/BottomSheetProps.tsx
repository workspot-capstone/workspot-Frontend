export type BottomSheetContentMode = "list" | "detail";

export interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  }
  touchMove: {
    prevTouchY?: number;
    movingDirection: "none" | "down" | "up";
  }
  isContentAreaTouched: boolean;
  isSheetDragging: boolean;
}