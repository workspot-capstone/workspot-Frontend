import { animate, useMotionValue } from "framer-motion"
import { useCallback, useEffect, useRef } from "react"
import { getMaxY, MIN_Y, MIDDLE_SNAP_BOTTOM_MARGIN } from "../constants/bottomSheet"
import type { BottomSheetContentMode } from "../types/BottomSheetProps"

interface BottomSheetMetrics {
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

const createInitialMetrics = (): BottomSheetMetrics => ({
  touchStart: {
    sheetY: 0,
    touchY: 0,
  },
  touchMove: {
    movingDirection: "none",
  },
  isContentAreaTouched: false,
  isSheetDragging: false,
})

const getNearestSnapPoint = (currentY: number, snapPoints: number[]) =>
  snapPoints.reduce((closest, point) =>
    Math.abs(point - currentY) < Math.abs(closest - currentY)
      ? point
      : closest,
  )

export const useBottomSheet = (contentMode: BottomSheetContentMode) => {
  const sheet = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const y = useMotionValue(typeof window === "undefined" ? 0 : getMaxY())
  const metrics = useRef<BottomSheetMetrics>(createInitialMetrics())
  const middleSnapY = useRef<number | null>(null)
  const previousContentMode = useRef(contentMode)
  const activeAnimation = useRef<ReturnType<typeof animate> | null>(null)

  const calculateMiddleY = useCallback((maxY: number) => {
    const currentSheet = sheet.current
    const currentContent = content.current

    if (!currentSheet || !currentContent) {
      return (MIN_Y + maxY) / 2
    }

    const snapTarget = currentContent.querySelector<HTMLElement>("[data-middle-snap]")
    const headerHeight =
      currentSheet.firstElementChild?.getBoundingClientRect().height ?? 0
    const contentTop = currentContent.getBoundingClientRect().top
    const targetBottom = snapTarget?.getBoundingClientRect().bottom ?? contentTop
    const visibleContentHeight =
      targetBottom - contentTop + currentContent.scrollTop
    const middleY =
      window.innerHeight -
      headerHeight -
      visibleContentHeight -
      MIDDLE_SNAP_BOTTOM_MARGIN

    return Math.max(MIN_Y, Math.min(maxY, middleY))
  }, [])

  useEffect(() => {
    const currentSheet = sheet.current
    const currentContent = content.current

    if (!currentSheet || !currentContent) {
      return
    }

    let maxY = getMaxY()
    y.set(maxY)

    const canMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current

      if (!isContentAreaTouched || y.get() > MIN_Y) {
        return true
      }

      return touchMove.movingDirection === "down" && currentContent.scrollTop <= 0
    }

    const handleTouchStart = (event: TouchEvent) => {
      activeAnimation.current?.stop()

      const touchY = event.touches[0].clientY
      const target = event.target
      metrics.current = {
        ...createInitialMetrics(),
        touchStart: {
          sheetY: y.get(),
          touchY,
        },
        touchMove: {
          prevTouchY: touchY,
          movingDirection: "none",
        },
        isContentAreaTouched:
          target instanceof Node && currentContent.contains(target),
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      const currentTouchY = event.touches[0].clientY
      const { touchStart, touchMove } = metrics.current
      const previousTouchY = touchMove.prevTouchY ?? touchStart.touchY
      const touchDelta = currentTouchY - previousTouchY

      if (touchDelta > 0) {
        touchMove.movingDirection = "down"
      } else if (touchDelta < 0) {
        touchMove.movingDirection = "up"
      }

      if (canMoveBottomSheet()) {
        event.preventDefault()

        if (!metrics.current.isSheetDragging) {
          touchStart.sheetY = y.get()
          touchStart.touchY = previousTouchY
          metrics.current.isSheetDragging = true
        }

        const nextY = touchStart.sheetY + currentTouchY - touchStart.touchY
        y.set(Math.max(MIN_Y, Math.min(maxY, nextY)))
      } else {
        metrics.current.isSheetDragging = false
      }

      touchMove.prevTouchY = currentTouchY
    }

    const handleTouchEnd = () => {
      const { isSheetDragging } = metrics.current

      if (isSheetDragging) {
        const currentY = y.get()
        const middleY = calculateMiddleY(maxY)
        middleSnapY.current = middleY
        const snapPoints = [MIN_Y, middleY, maxY]
        const snapY = getNearestSnapPoint(currentY, snapPoints)

        activeAnimation.current = animate(y, snapY, {
          type: "spring",
          stiffness: 400,
          damping: 40,
        })
      }

      metrics.current = createInitialMetrics()
    }

    const touchMoveOptions: AddEventListenerOptions = { passive: false }
    currentSheet.addEventListener("touchstart", handleTouchStart)
    currentSheet.addEventListener("touchmove", handleTouchMove, touchMoveOptions)
    currentSheet.addEventListener("touchend", handleTouchEnd)
    currentSheet.addEventListener("touchcancel", handleTouchEnd)

    const handleResize = () => {
      maxY = getMaxY()
      const currentY = y.get()
      const middleY = calculateMiddleY(maxY)
      middleSnapY.current = middleY
      const snapPoints = [MIN_Y, middleY, maxY]
      const nearestSnap = getNearestSnapPoint(currentY, snapPoints)
      y.set(nearestSnap)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      activeAnimation.current?.stop()
      currentSheet.removeEventListener("touchstart", handleTouchStart)
      currentSheet.removeEventListener("touchmove", handleTouchMove, touchMoveOptions)
      currentSheet.removeEventListener("touchend", handleTouchEnd)
      currentSheet.removeEventListener("touchcancel", handleTouchEnd)
      window.removeEventListener("resize", handleResize)
    }
  }, [calculateMiddleY, y])

  useEffect(() => {
    if (previousContentMode.current === contentMode) {
      return
    }

    const previousMiddleY = middleSnapY.current
    previousContentMode.current = contentMode

    if (previousMiddleY === null || Math.abs(y.get() - previousMiddleY) > 2) {
      return
    }

    const nextMiddleY = calculateMiddleY(getMaxY())
    middleSnapY.current = nextMiddleY
    activeAnimation.current?.stop()
    activeAnimation.current = animate(y, nextMiddleY, {
      type: "spring",
      stiffness: 400,
      damping: 40,
    })
  }, [calculateMiddleY, contentMode, y])

  return { sheet, content, y }
}
