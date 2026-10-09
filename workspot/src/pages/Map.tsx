import { Header } from "../components/Header"
import { Search } from "../components/Search";
import { ServiceArea } from "../components/ServiceArea"

export const Map = () => {
  const handleSearch = (query: string) => {
    // API
    console.log('검색어:', query);
  }

  return (
    <>
      <Header
        title="Workspot"
        content={<ServiceArea content="명지대 일대" />}
        contentClassName="w-fit" />
        <Search onSearch={handleSearch} />
    </>
  )
}
