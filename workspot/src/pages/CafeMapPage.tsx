import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header"
import { MapView } from "../components/MapView";
import { Search } from "../components/Search";
import { ServiceArea } from "../components/ServiceArea"

export const CafeMapPage = () => {
  const handleSearch = (query: string) => {
    // API
    console.log('검색어:', query);
  }

  return (
    <div className="flex h-dvh flex-col">
      <Header
        title="Workspot"
        content={<ServiceArea content="명지대 일대" />}
        extraContent={<Search onSearch={handleSearch} />}
        contentClassName="w-fit" />
        <div className="flex-1">
          <MapView />
        </div>
      <BottomSheet />
    </div>
  )
}
