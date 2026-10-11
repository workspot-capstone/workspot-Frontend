import { animate, useMotionValue } from "framer-motion"
import { useEffect, useRef } from "react"
import { getMaxY, MIN_Y } from "../constants/bottomSheet"

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number
    touchY: number
  }
  touchMove: {
    prevTouchY?: number
    movingDirection: "none" | "down" | "up"
  }
  isContentAreaTouched: boolean
  isSheetDragging: boolean
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

export const useBottomSheet = () => {
  const sheet = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const y = useMotionValue(typeof window === "undefined" ? 0 : getMaxY())
  const metrics = useRef<BottomSheetMetrics>(createInitialMetrics())

  useEffect(() => {
    const currentSheet = sheet.current
    const currentContent = content.current

    if (!currentSheet || !currentContent) {
      return
    }

    let maxY = getMaxY()
    let activeAnimation: ReturnType<typeof animate> | undefined
    y.set(maxY)

    const getMiddleY = () => {
      const list = currentContent.firstElementChild
      const cards = list?.children

      if (!cards?.length) {
        return (MIN_Y + maxY) / 2
      }

      const lastVisibleCard = cards.item(Math.min(2, cards.length - 1))
      const headerHeight =
        currentSheet.firstElementChild?.getBoundingClientRect().height ?? 0
      const contentTop = currentContent.getBoundingClientRect().top
      const visibleContentHeight =
        (lastVisibleCard?.getBoundingClientRect().bottom ?? contentTop) -
        contentTop +
        currentContent.scrollTop
      const middleY =
        window.innerHeight - headerHeight - visibleContentHeight

      return Math.max(MIN_Y, Math.min(maxY, middleY))
    }

    const canMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current

      if (!isContentAreaTouched || y.get() > MIN_Y) {
        return true
      }

      return touchMove.movingDirection === "down" && currentContent.scrollTop <= 0
    }

    const handleTouchStart = (event: TouchEvent) => {
      activeAnimation?.stop()

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
        const snapPoints = [MIN_Y, getMiddleY(), maxY]
        const snapY = snapPoints.reduce((closest, point) =>
          Math.abs(point - currentY) < Math.abs(closest - currentY)
            ? point
            : closest,
        )

        activeAnimation = animate(y, snapY, {
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
      const snapPoints = [MIN_Y, getMiddleY(), maxY]
      const nearestSnap = snapPoints.reduce((closest, point) =>
        Math.abs(point - currentY) < Math.abs(closest - currentY)
          ? point
          : closest,
      )
      y.set(nearestSnap)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      activeAnimation?.stop()
      currentSheet.removeEventListener("touchstart", handleTouchStart)
      currentSheet.removeEventListener("touchmove", handleTouchMove, touchMoveOptions)
      currentSheet.removeEventListener("touchend", handleTouchEnd)
      currentSheet.removeEventListener("touchcancel", handleTouchEnd)
      window.removeEventListener("resize", handleResize)
    }
  }, [y])

  return { sheet, content, y }
}
