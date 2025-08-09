import AIFace from "../assets/images/AIFace.svg?react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F7FBFF]">
      <AIFace className="w-32 h-32 mb-6" />

      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 animate-loading" />
      </div>
    </div>
  );
};

export default LoadingPage;
