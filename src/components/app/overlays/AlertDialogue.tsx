// @ts-nocheck

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";

const AlertDialogue = () => {
  const { alertDialogueOpen, setAlertDialogueOpen, alertDialogueConfig } =
    useAppConfig();

  return (
    <>
      {/* Alert Dialogue */}
      <AlertDialog open={alertDialogueOpen} onOpenChange={setAlertDialogueOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertDialogueConfig.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertDialogueConfig.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel size="lg" variant="secondary">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                alertDialogueConfig.action();
              }}
              size="lg"
              variant="destructive"
            >
              {alertDialogueConfig.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDialogue;
