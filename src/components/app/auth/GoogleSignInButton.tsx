// @ts-nocheck
import { Button } from "@/components/ui/button";
import { redirect, useNavigate } from "react-router";
import { toast } from "sonner";
import SuccessSonner from "@/components/app/alerts/sonners/SuccessSonner";
import DangerSonner from "@/components/app/alerts/sonners/DangerSonner";

import { useAuth } from "@/contexts/authContext/AuthProvider";

const GoogleSignInButton = ({ redirectTo = "" }) => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    console.log("redirectTo: ", redirectTo);

    try {
      await signInWithGoogle();
      navigate(redirectTo || "/", { replace: true });
      console.log("redirecting to: ", redirectTo);
      console.log("redirection: successful");
      toast.custom(() => <SuccessSonner title="Login Successful" />);
    } catch (err) {
      console.error(err);
      toast.custom(() => (
        <DangerSonner
          title="Login Failed"
          description="Look into the Console"
        />
      ));
    }
  };

  return (
    <Button
      onClick={() => handleGoogleLogin()}
      variant="outline"
      type="button"
      className="flex items-center justify-center gap-3"
    >
      <img
        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
        alt="Google Icon"
        className="size-5"
      />
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
