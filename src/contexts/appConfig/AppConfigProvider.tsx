// @ts-nocheck

import { AppConfig } from "@/constants/";
import { createContext, useContext, useState, useEffect } from "react";

const ConfigContext = createContext({});

export const AppConfigProvider = ({ children }) => {
  // Theme — persistent
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("vite-ui-theme");
    return saved || AppConfig.fallbacks.defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("vite-ui-theme", theme);
  }, [theme]);

  // Cursor — persistent
  const [cursor, setCursor] = useState(() => {
    const saved = localStorage.getItem("global-cursor");
    return saved ? JSON.parse(saved) : AppConfig.fallbacks.defaultCursor;
  });

  useEffect(() => {
    localStorage.setItem("global-cursor", JSON.stringify(cursor));
  }, [cursor]);

  const value = {
    ...AppConfig.constants,
    // Dynamic config
    theme,
    setTheme,
    cursor,
    setCursor,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within ConfigProvider");
  }
  return context;
};
