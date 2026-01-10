// @ts-nocheck

import { useState } from "react";
import { useAuth } from "@/contexts/authContext/AuthProvider";

import { GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import SuccessSonner from "@/components/app/alerts/sonners/SuccessSonner";
import DangerSonner from "@/components/app/alerts/sonners/DangerSonner";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";
import GoogleSignInButton from "@/components/app/auth/GoogleSignInButton";

const LoginPage = () => {
  const { signInUser } = useAuth();
  const { site_title } = useAppConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const goingTo = location.state || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const email = data.get("email");
    const password = data.get("password");

    try {
      setIsSubmitting(true);
      await signInUser(email, password);

      form.reset();
      navigate(goingTo, { replace: true });
      toast.custom(() => <SuccessSonner title="Login Successful" />);
    } catch (err) {
      console.error(err);
      toast.custom(() => (
        <DangerSonner
          title="Login Failed"
          description="Look into the Console"
        />
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {site_title || "site_title"} Inc.
        </a>
        {/* Login form below */}
        <div className="flex flex-col gap-6">
          <Card className="min-w-md border border-transparent dark:border-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Login with your Google account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleLogin(e)}>
                <FieldGroup>
                  {/* Google Button */}
                  <Field>
                    <GoogleSignInButton redirectTo={location.state} />
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="me@example.com"
                      name="email"
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a className="ml-auto text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      placeholder="Password"
                      type="password"
                      name="password"
                      required
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Logging In..." : "Login"}
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <Link to={"/signup"} state={goingTo} replace>
                        <Button variant={"link"}>Sing Up</Button>
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
        {/* Login form above */}
      </div>
    </div>
  );
};

export default LoginPage;
