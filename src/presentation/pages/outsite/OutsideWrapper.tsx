import { Outlet } from "react-router-dom";

const OutsideWrapper = () => {
  return (
    <div className='min-h-screen bg-[url("/src/presentation/assets/img/bg-image-test.webp")] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4'>
      <div className='w-[400px] rounded-lg p-6 md:py-8 md:px-12'>
        <Outlet />
      </div>
    </div>
  );
};
export default OutsideWrapper;
