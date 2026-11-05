import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { ServiceArea } from '../components/ServiceArea'
import { Search } from '../components/Search'
import { ErrorState } from '../components/ErrorState'
import { searchCafes } from '../apis/cafes'

export const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const searchMutation = useMutation({
    mutationFn: searchCafes,
    onSuccess: (cafes, query) => {
      queryClient.setQueryData(['cafes', query], cafes);
      navigate(`/map?query=${encodeURIComponent(query)}`);
    },
  })

  const handleSearch = (query: string) => {
    searchMutation.mutate(query);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Header
        title="Workspot"
        content={`더 좋은 공간에서, \n더 좋은 집중을`}
        extraContent={<ServiceArea content="명지대 일대" />}
        contentClassName="whitespace-pre-line text-small text-workspot-gray-500" />
      <div className="w-full px-4">
        <h1 className="w-full mt-12 mb-6 text-left text-title text-workspot-gray-900 whitespace-pre-line">{`오늘 작업하기 쉬운 장소,\n 쉽게 찾아 보세요.`}</h1>
        <Search onSearch={handleSearch} isLoading={searchMutation.isPending} />
        {searchMutation.isError && (
          <ErrorState
            message="검색 결과를 불러오지 못했어요."
            description="네트워크 상태를 확인한 뒤 다시 시도해주세요."
            onRetry={() => {
              if (searchMutation.variables) {
                searchMutation.mutate(searchMutation.variables)
              }
            }}
          />
        )}
      </div>
    </div>
  )
}