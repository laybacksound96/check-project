import { useEffect, useState, RefObject } from "react";

const useDetectClose = <T extends HTMLElement>(
  elem: RefObject<T>,
  initialState: boolean
) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (elem.current && !elem.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, elem]);

  return [isOpen, setIsOpen] as const;
};

export default useDetectClose;
