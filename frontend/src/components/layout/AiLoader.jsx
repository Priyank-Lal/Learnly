import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react'

const AiLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-900/50 brightness-110 dark:brightness-100 bg-opacity-40 flex items-center justify-center z-99">
      <DotLottieReact
        src="/AiSearching.lottie"
        autoplay
        loop
        className="w-80 h-80 "
      />
    </div>
  );
}

export default AiLoader