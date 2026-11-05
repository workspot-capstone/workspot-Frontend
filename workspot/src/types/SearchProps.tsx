export type SearchProps = {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialQuery?: string;
};