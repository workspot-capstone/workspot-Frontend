import main from '../assets/main.png'
import type { HeaderProps } from "../types/HeaderProps";

export const Header = ({ title, content, contentClassName }: HeaderProps
) => {
  return (
    <header className="flex items-center justify-between w-full h-16 px-4 py-2">
      <div className="flex items-center gap-2 mb-2">
        <img src={main} alt="Workspot Logo" className="w-7 h-7" />
        <h1 className="text-title text-workspot-gray-900 pt-1">{title}</h1>
      </div>
      <div className={contentClassName}>
        {content}
      </div>
    </header>
  )
}