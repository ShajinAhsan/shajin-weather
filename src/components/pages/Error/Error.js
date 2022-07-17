// Error 404 Component
import { useHistory } from "react-router-dom";
import "./Error.css"; // Importing Error.css

function Error() {
  const navigate = useHistory(); // React useHistory Hooks
  return (
    <div className="container mx-auto text-center min-h-screen flex flex-col justify-center">
      <div>
        <h1 className="text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-800">
          404
        </h1>
      </div>
      <h2 className="text-gray-800 text-3xl">
        Not found or maybe you don't have permission to view this route.
      </h2>
      <button
        className="mt-16 bg-black hover:bg-gray-800 text-white px-4 py-3 transition-all duration-150 rounded-tl-lg rounded-br-lg hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-lg hover:rounded-tr-lg font-medium"
        type="button"
        onClick={() => navigate.push("/")}
      >
        Go Back to Home
        {/* When clicked it will go back to /home route */}
      </button>
    </div>
  );
}

export default Error;
