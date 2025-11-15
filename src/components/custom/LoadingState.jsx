import Logo from "../../assets/logo.svg"

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={Logo} alt="Logo" className="h-auto w-70 md:w-100 animate-caret-blink animation-duration-[2s] ease-in" />
    </div>
  );
};

export default LoadingState;
