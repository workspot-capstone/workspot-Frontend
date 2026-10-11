import type { PropsWithChildren, Ref } from "react"

type BottomSheetContentLayoutProps = PropsWithChildren<{
  contentRef: Ref<HTMLDivElement>
}>

export const BottomSheetContentLayout = ({
  children,
  contentRef,
}: BottomSheetContentLayoutProps) => (
  <div
    ref={contentRef}
    className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
  >
    {children}
  </div>
)
