import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header"
import { Search } from "../components/Search";
import { ServiceArea } from "../components/ServiceArea"

export const CafeMapPage = () => {
  const handleSearch = (query: string) => {
    // API
    console.log('검색어:', query);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Header
        title="Workspot"
        content={<ServiceArea content="명지대 일대" />}
        contentClassName="w-fit" />
      <Search onSearch={handleSearch} />
      <BottomSheet />
    </div>
  )
}
