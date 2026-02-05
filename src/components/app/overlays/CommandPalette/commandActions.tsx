// @ts-nocheck

import axios from "axios";
import { default_services } from "@/constants";
import { notify } from "@/lib/notify";

export const createCommandActions = ({
  navigate,
  setTheme,
  setCursor,
  openAlertDialogue,
  signOutUser,
}) => {
  return {
    // Navigation actions
    goHome: () => navigate("/"),
    goServices: () => navigate("/services"),
    goCreate: () => navigate("/create"),
    goMyServices: () => navigate("/my-services"),
    goMyOrders: () => navigate("/my-orders"),
    goContact: () => navigate("/contact"),
    goAbout: () => navigate("/about"),
    goProfile: () => navigate("/profile"),
    goSettings: () => navigate("/settings"),
    goLogin: () => navigate("/login"),

    // Theme/Cursor actions
    toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    toggleCursor: () => setCursor((prev) => !prev),

    // Complex actions
    resetDatabase: () => {
      openAlertDialogue({
        title: "Reset Database?",
        description: "This will delete ALL data. No going back. 💣",
        action: async () => {
          try {
            const { data: dbRes } = await axios.post(
              "http://localhost:3000/reset",
              default_services,
            );
            notify.success({ title: dbRes.message });
          } catch (err) {
            console.error(err);
            notify.danger({ title: err.code, description: err.message });
          }
        },
      });
    },
    logout: () => {
      openAlertDialogue({
        title: "Log Out? 🥲",
        description: "You'll need to sign in again.",
        confirmText: "Logout",
        action: () => {
          signOutUser();
          navigate("/login");
          notify.success({ title: "Logout Successful" });
        },
      });
    },
  };
};
