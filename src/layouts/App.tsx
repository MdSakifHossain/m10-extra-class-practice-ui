// @ts-nocheck

import { Outlet } from "react-router";
import Footer from "@/components/app/layout/Footer";
import Navbar from "@/components/app/layout/Navbar";
import GhostCursor from "@/components/app/appearance/GhostCursor";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/authContext/AuthProvider";
import {
  AppConfigProvider,
  useAppConfig,
} from "@/contexts/appConfig/AppConfigProvider";
import CommandPalette from "@/components/app/overlays/CommandPalette/CommandPalette";
import AlertDialogue from "@/components/app/overlays/AlertDialogue";

const App = () => {
  return (
    <AuthProvider>
      <AppConfigProvider>
        <InnerApp />
      </AppConfigProvider>
    </AuthProvider>
  );
};

// This component lives inside the providers
const InnerApp = () => {
  const { cursor } = useAppConfig();

  return (
    <>
      {cursor && <GhostCursor className="bg-primary!" />}
      <Toaster position="top-center" />
      <CommandPalette />
      <AlertDialogue />
      <div className="min-h-svh flex flex-col">
        <Navbar />
        <div className="flex-1 py-10 flex flex-col">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
