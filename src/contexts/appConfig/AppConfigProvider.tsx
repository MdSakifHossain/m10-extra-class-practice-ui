// @ts-nocheck

import { AppConfig } from "@/constants/";
import { createContext, useContext, useState, useEffect } from "react";

const ConfigContext = createContext({});

export const AppConfigProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("vite-ui-theme");
    return saved || AppConfig.fallbacks.defaultTheme;
  });
  const [cursor, setCursor] = useState(() => {
    const saved = localStorage.getItem("global-cursor");
    return saved ? JSON.parse(saved) : AppConfig.fallbacks.defaultCursor;
  });
  // Alert Dialogue
  const [alertDialogueOpen, setAlertDialogueOpen] = useState(false);
  const [alertDialogueConfig, setAlertDialogueConfig] = useState({
    title: "",
    description: "",
    confirmText: "",
    action: () => {},
  });
  // command palette
  const [commandOpen, setCommandOpen] = useState(false);
  const [cpIcon, setCpIcon] = useState(AppConfig.fallbacks.defaultCpIcon);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("vite-ui-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("global-cursor", JSON.stringify(cursor));
  }, [cursor]);

  // helper for the Alert Dialogue
  const openAlertDialogue = ({
    title = "Are you sure?",
    description = "This action cant be undone. So, be sure before confirming.",
    confirmText = "Continue",
    action = () => {
      alert("Action is not Served");
    },
  }) => {
    setAlertDialogueConfig({ title, description, confirmText, action });
    setAlertDialogueOpen(true);
  };

  const value = {
    ...AppConfig.constants,
    openAlertDialogue,
    // Dynamic config
    theme,
    setTheme,
    cursor,
    setCursor,
    alertDialogueOpen,
    setAlertDialogueOpen,
    alertDialogueConfig,
    setAlertDialogueConfig,
    commandOpen,
    setCommandOpen,
    cpIcon,
    setCpIcon,
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
