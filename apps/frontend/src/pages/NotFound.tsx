type Props = {
  path: string;
  title: string;
};

export function NotFound({ path, title }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href={path} className="text-blue-500 hover:text-blue-700 underline">
          Return to {title}
        </a>
      </div>
    </div>
  );
}
