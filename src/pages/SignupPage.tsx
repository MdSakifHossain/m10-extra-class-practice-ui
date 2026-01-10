// @ts-nocheck
import React, { useState } from "react";
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
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import DangerSonner from "@/components/app/alerts/sonners/DangerSonner";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import SuccessSonner from "@/components/app/alerts/sonners/SuccessSonner";
import GoogleSignInButton from "@/components/app/auth/GoogleSignInButton";

const SignupPage = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const goingTo = location.state || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const formData = {
      fullName: data.get("name").trim(),
      email: data.get("email").trim(),
      password: data.get("password").trim(),
      confirmPassword: data.get("confirm_password").trim(),
    };

    // full name validation
    if (!formData.fullName) {
      toast.custom(() => (
        <DangerSonner
          title="Full name missing"
          description="Please provide your full name"
        />
      ));
      return;
    }

    // email validation
    const EMAIL_REGEX =
      /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))\])$/;
    const isValidEmail = (email) => {
      return EMAIL_REGEX.test(email.trim());
    };
    if (!isValidEmail(formData.email)) {
      toast.custom(() => (
        <DangerSonner
          title="Validation Error"
          description="Provide a valid email address"
        />
      ));
      return;
    }

    // password validation for eithr both of them are same or not
    if (formData.password !== formData.confirmPassword) {
      toast.custom(() => (
        <DangerSonner
          title="Validation Error"
          description="Both Passwords didn't Matched"
        />
      ));
      return;
    }

    // password validatin with min length
    const minPassLength = 6;
    if (formData.password.length < minPassLength) {
      toast.custom(() => (
        <DangerSonner
          title="Validation Error"
          description={`Password must be at least ${minPassLength} Char Long`}
        />
      ));
      return;
    }

    // password validation for lowercase
    const regexLower = /^(?=.*[a-z]).+$/;
    if (!regexLower.test(formData.password)) {
      toast.custom(() => (
        <DangerSonner
          title="Validation Error"
          description="Password must contain at least one Lowercase Char"
        />
      ));
      return;
    }

    // password validation with uppercase
    const regexUpper = /^(?=.*[A-Z]).+$/;
    if (!regexUpper.test(formData.password)) {
      toast.custom(() => (
        <DangerSonner
          title="Validation Error"
          description="Password must contain at least one Uppercase Char"
        />
      ));
      return;
    }

    // passwrod validation with numaric
    const regexNum = /(?=.*\d)/;
    if (!regexNum.test(formData.password)) {
      toast.custom(() => (
        <DangerSonner
          title="Validation Error"
          description="Password must contain at least one Numaric Char"
        />
      ));
      return;
    }

    // password validation with non alpha numaric
    const specialCharRegex = /^(?=.*[\^$*.\[\]{}()?"!@#%&/\\,><':;|_~]).+$/;
    if (!specialCharRegex.test(formData.password)) {
      toast.custom(() => (
        <DangerSonner
          title="Validation Error"
          description="Password must contain at least one Non Alpha Numaric Char"
        />
      ));
      return;
    }

    try {
      setIsSubmitting(true);
      await createUser(formData.email, formData.password);
      await updateUserProfile({
        displayName: formData.fullName,
        // photoURL: profileURL || getRandom(DEFAULT_AVATARS).url,
      });

      // reset the form
      form.reset();

      // show a success message
      toast.custom(() => (
        <SuccessSonner
          title="Success"
          description="Account has been created Successfully"
        />
      ));

      navigate(goingTo, { replace: true });
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Card className="min-w-md border border-transparent dark:border-primary">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FieldGroup>
              {/* Full Name */}
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirm_password"
                  required
                />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              </Field>

              {/* Create Button */}
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
              </Field>

              {/* Separator */}
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              {/* Google Button */}
              <Field>
                <GoogleSignInButton redirectTo={goingTo} />
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link to={"/login"} state={goingTo}>
                    <Button variant="link">Login</Button>
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
