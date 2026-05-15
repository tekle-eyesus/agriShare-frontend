import { BarLoader, PulseLoader } from "react-spinners";

function Loader({ isGlobal = false }) {
  // TODO: make the color of the loader match the theme
  return (
    <div
      className={`${isGlobal ? "h-screen z-50" : "h-full z-10"} flex justify-center items-center`}
    >
      {isGlobal ? (
        <BarLoader color="#008236" />
      ) : (
        <PulseLoader color="#008236" />
      )}
    </div>
  );
}

export default Loader;
