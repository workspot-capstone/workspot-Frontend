import { Search as SearchIcon } from 'lucide-react'
import { useState, type SubmitEvent } from 'react'
import type { SearchProps } from '../types/SearchProps'

export const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    // 빈 검색어나 공백 검색어는 검색하지 않도록 처리
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-xl border border-color-bor bg-white px-3 py-2 focus-within:border-workspot-blue-600"
    >
      <button
        type="submit"
        aria-label="검색"
        className="shrink-0 text-workspot-blue-600"
      >
        <SearchIcon aria-hidden="true" className="h-5 w-5 text-workspot-gray-500" />
      </button>
      <label htmlFor="natural-language-search" className="sr-only">
        찾고 싶은 공간을 검색하세요
      </label>
      <input
        id="natural-language-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="예: 조용하고 콘센트 있는 카페"
        className="min-w-0 flex-1 bg-transparent text-body text-workspot-gray-900 outline-none placeholder:text-workspot-gray-500"
      />
    </form>
  )
}