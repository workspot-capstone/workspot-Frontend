import { Header } from '../components/Header'

export const Home = () => {
  return (
    <>
      <Header
        title="Workspot"
        content={`더 좋은 공간에서, \n더 좋은 집중을`}
        contentClassName="whitespace-pre-line text-small text-workspot-gray-500" />
    </>
  )
}