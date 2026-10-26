import errorStateImage from '../assets/error-state.png'

type ErrorStateProps = {
  message?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, description, onRetry }: ErrorStateProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 p-4 text-body">
      <img src={errorStateImage} alt="" className="w-60 h-auto object-contain" />
      <h1 className="text-title text-text-primary">
      {message}
      </h1>
      {description && (
        <p className="mb-10 text-text-description whitespace-pre-line">
          {description}
        </p>
      )}
      {onRetry && (
        <button onClick={onRetry} className="self-stretch mx-6 flex items-center justify-center py-2 bg-primary-soft text-primary text-body rounded-xl hover:text-text-hover">
          <p>다시 시도</p>
        </button>
      )}
    </div>
  )
}