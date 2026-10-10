import main from '../assets/main.png'
import type { HeaderProps } from "../types/HeaderProps";

export const Header = ({ title, content, extraContent, contentClassName }: HeaderProps
) => {
  return (
    <header className="flex w-full flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={main} alt="Workspot Logo" className="w-7 h-7" />
          <h1 className="pt-1 text-title text-workspot-gray-900">{title}</h1>
        </div>
        <div className={contentClassName}>
          {content}
        </div>
      </div>
      {extraContent && (
        <div className="w-full">
          {extraContent}
        </div>
      )}
    </header>
  )
}