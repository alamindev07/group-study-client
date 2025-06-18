import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-bold text-error">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-base-content">
          Oops! Page Not Found
        </h2>
        <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto">
          The page you're looking for doesn't exist or was moved. Maybe you mistyped the address or followed a broken link.
        </p>
        <div className="flex justify-center">
          <Link to="/" className="btn btn-primary btn-wide">
            Go Back Home
          </Link>
        </div>

    
      </div>
    </div>
  );
};

export default ErrorPage;
