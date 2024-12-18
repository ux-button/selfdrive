import { useEffect } from "react";
import { TickIcon } from "../assets/TickIcon";
import { CrossIcon } from "../assets/CrossIcon";

// TO DO: Add here full toast and hook logic to call it inside modal
const Toast = ({ type, isVisible, handleClose, children }) => {
  const toastType = {
    success: <TickIcon />,
    error: <CrossIcon />,
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(handleClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, handleClose]);

  return (
    <div
      className={`fixed w-full flex justify-center bottom-2 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex bg-slate-900 w-fit pl-4 pr-5 py-2 space-x-2 rounded-full">
        <div className="py-1">{toastType[type]}</div>
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
};

export { Toast };
