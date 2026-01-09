import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const DangerAlert = ({ title = "", description = "" }) => {
  return (
    <Alert
      variant="destructive"
      className="max-w-md border-2 border-x-destructive px-6 py-7 rounded-2xl"
    >
      <AlertCircleIcon className="size-6" />
      <AlertTitle className="text-lg">{title}</AlertTitle>
      <AlertDescription>
        <p className="text-foreground">{description}</p>
      </AlertDescription>
    </Alert>
  );
};

export default DangerAlert;
