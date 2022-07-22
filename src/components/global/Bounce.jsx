import "../styles/Bounce.css";

export const Bounce = () => {
  return (
    <div className="min-h-screen flex space-x-8 p-5 rounded-full justify-center items-center">
      <div className="bg-orange-500 p-4 w-10 h-10 rounded-full animate-bounce orange-circle"></div>
      <div className="bg-cyan-500 p-4 w-10 h-10 rounded-full animate-bounce cyan-circle"></div>
      <div className="bg-purple-500 p-4 w-10 h-10 rounded-full animate-bounce purple-circle"></div>
    </div>
  );
};
