import serviceArea from '../assets/local-area.png'

export const ServiceArea = ({content}: {content: string}) => {
  return (
    <section className="flex items-center w-full h-8 pl-2 pr-5 rounded-full bg-workspot-blue-200">
      <img src={serviceArea} alt="Service Area" className="w-6 h-6 mx-0.5 workspot-blue-600" />
      <p className="text-small text-workspot-blue-600">{content}</p>
    </section>
  )
}