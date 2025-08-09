import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full relative flex justify-center font-suit overflow-hidden no-scrollbar">
      {/*sm - 640px 이상
        md - 768px 이상
        lg - 1024px 이상
        xl - 1280px 이상
        2xl - 1536px 이상
      */}
      <div className="w-full sm:max-w-[393px] min-h-screen relative flex flex-col outline-[0.5px] outline-[#E0E0E0] no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
