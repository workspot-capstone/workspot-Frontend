import { Header } from "../components/Header"
import { ServiceArea } from "../components/ServiceArea"

export const Map = () => {
  return (
    <>
      <Header
        title="Workspot"
        content={<ServiceArea content="명지대 일대" />} />
    </>
  )
}
