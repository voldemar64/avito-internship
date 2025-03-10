import { useEffect, useState } from "react";

// Тип для данных, которые возвращаются функцией getWindowWidth
interface WindowWidth {
  width: number;
}

// Функция для получения ширины окна
export function getWindowWidth(): WindowWidth {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

// Хук для отслеживания ширины окна
export function useWindowWidth(): WindowWidth {
  const [windowWidth, setWindowWidth] = useState<WindowWidth>(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
