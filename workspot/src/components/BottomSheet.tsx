import { mockCafes } from "../mocks/mockCafes"
import { CafeList } from "./CafeList"

export const BottomSheet = () => {
  return (
    <>
      <CafeList cafes={mockCafes} />
    </>
  )
}