import { createPortal } from "react-dom";

interface LoaderProps {
  show: boolean;
}

export const Loader = ({ show }: LoaderProps) => {
  if (!show) {
    return null;
  }

  const loaderContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 bg-opacity-50"
      aria-labelledby="loading-label"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"
          role="status"
        ></div>
        <span id="loading-label" className="sr-only">
          Cargando
        </span>
      </div>
    </div>
  );

  return createPortal(loaderContent, document.body);
};
