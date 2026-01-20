// @ts-nocheck
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

import { useAuth } from "@/contexts/authContext/AuthProvider";
import { notify } from "@/lib/notify";

const GoogleSignInButton = ({ redirectTo = "" }) => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    console.log("redirectTo: ", redirectTo);

    try {
      await signInWithGoogle();
      navigate(redirectTo || "/", { replace: true });
      notify.success({ title: "Login Successful" });
    } catch (err) {
      console.error(err);
      notify.danger({
        title: "Login Failed",
        description: "Look into the Console",
      });
    }
  };

  return (
    <Button
      onClick={() => handleGoogleLogin()}
      variant="outline"
      type="button"
      size="lg"
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
