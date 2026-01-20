// @ts-nocheck

import { toast } from "sonner";
import SuccessSonner from "@/components/app/alerts/sonners/SuccessSonner";
import DangerSonner from "@/components/app/alerts/sonners/DangerSonner";

const showToast = (Component, { title = "Success", description = "" }) => {
  toast.custom(() => <Component title={title} description={description} />);
};

export const notify = {
  success: (options) => showToast(SuccessSonner, options),
  danger: (options) => showToast(DangerSonner, options),
};
