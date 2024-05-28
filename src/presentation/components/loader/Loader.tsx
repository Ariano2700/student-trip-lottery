import "./Loader.css";
export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader">
        <div data-glitch="Loading..." className="glitch">
          Loading...
        </div>
      </div>
    </div>
  );
};
