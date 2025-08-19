import { useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Brain } from "lucide-react";

function Icon() {
  const iconRef = useRef();
useEffect(() => {
  const timeout = setTimeout(() => {
    if (iconRef.current) {
      toPng(iconRef.current, { pixelRatio: 2 }).then((dataUrl) => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = dataUrl;
      });
    }
  }, 300); 

  return () => clearTimeout(timeout);
}, []);

  return (
    <div
      ref={iconRef}
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 -z-9999 absolute"
    >
      <Brain className="h-5 w-5 text-white" />
    </div>
  );
}

export default Icon;
