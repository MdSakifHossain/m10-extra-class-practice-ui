import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const DangerSonner = ({ title = "", description = "" }) => {
  return (
    <Alert className="font-sans border-destructive bg-background shadow dark:shadow-none dark:bg-muted text-destructive rounded-none border-0 border-l-8 md:min-w-md select-none">
      <AlertCircleIcon className="size-5" />
      <AlertTitle className="text-base">{title}</AlertTitle>
      <AlertDescription className="dark:text-foreground">
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default DangerSonner;
