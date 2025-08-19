import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <DotLottieReact
        src="/Loading.lottie"
        autoplay
        loop
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};

export default Loader;
