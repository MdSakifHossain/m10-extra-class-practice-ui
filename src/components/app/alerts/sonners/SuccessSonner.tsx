import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck } from "lucide-react";

const SuccessSonner = ({ title = "", description = "" }) => {
  return (
    <>
      {/* 
      <Alert
        variant="default"
        className="font-poppins px-6 py-6 border-green-500 text-green-500 shadow select-none rounded-none md:min-w-md"
      >
        <CircleCheck className="size-6" />
        <AlertTitle className="text-lg font-semibold">{title}</AlertTitle>
        <AlertDescription>
          <p className="text-base">{description}</p>
        </AlertDescription>
      </Alert> 
      */}

      <Alert className="font-poppins border-green-500 bg-background dark:bg-muted text-green-500 rounded-none border-0 border-l-8 md:min-w-md select-none">
        <CircleCheck className="size-5" />
        <AlertTitle className="text-base">{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </>
  );
};

export default SuccessSonner;
