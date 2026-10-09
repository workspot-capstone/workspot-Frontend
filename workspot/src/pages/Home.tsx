import { Header } from '../components/Header'
import { ServiceArea } from '../components/ServiceArea'
import { Search } from '../components/Search'

export const Home = () => {
  const handleSearch = (query: string) => {
    // API
    console.log('검색어:', query);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Header
        title="Workspot"
        content={`더 좋은 공간에서, \n더 좋은 집중을`}
        contentClassName="whitespace-pre-line text-small text-workspot-gray-500" />
      <div className="w-full px-10">
        <ServiceArea content="서비스 지역 : 명지대 일대" />
      </div>
      <h1 className="text-title text-workspot-gray-900 whitespace-pre-line">{`오늘 작업하기 쉬운 장소,\n 쉽게 찾아 보세요.`}</h1>
      <Search onSearch={handleSearch} />
    </div>
  )
}