// @ts-nocheck

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, NavLink, useNavigate } from "react-router";
import { ModeToggle } from "@/components/app/appearance/mode-toggle";
import { nav_links } from "@/constants";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import SuccessSonner from "@/components/app/alerts/sonners/SuccessSonner";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useAuth } from "@/contexts/authContext/AuthProvider";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { site_title, cursor, setCursor } = useAppConfig();
  const navigate = useNavigate();

  const handleGoogleLogout = () => {
    signOutUser();
    navigate("/login");
    toast.custom(() => <SuccessSonner title="Logout Successful" />);
  };

  const navlinksComp = user
    ? nav_links.map((link) => (
        <NavigationMenuItem key={link.id}>
          <NavLink id="navitem" to={link.link}>
            <NavigationMenuLink>{link.text}</NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
      ))
    : nav_links
        .filter((link) => !link.hidden)
        .map((link) => (
          <NavigationMenuItem key={link.id}>
            <NavLink id="navitem" to={link.link}>
              <NavigationMenuLink>{link.text}</NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
        ));

  return (
    <div
      className="flex items-center justify-between px-24 py-4 border-b"
      id="navbar"
    >
      <Link to={"/"} className="text-4xl font-medium select-none italic">
        {site_title || "site_title"}
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="**:text-lg flex gap-6 select-none">
          {navlinksComp}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-4">
        <ModeToggle />

        {user ? (
          <Popover>
            <PopoverTrigger
              aschild
              className={
                "border-2 rounded-full border-transparent dark:border-primary"
              }
            >
              <Button
                className="rounded-full"
                variant={"outline"}
                size={"icon-lg"}
              >
                <UserRound className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-1.5 text-center">
                  <p className="text-lg font-semibold">{site_title}</p>
                  <p className="text-muted-foreground text-sm">
                    Welcome to {site_title} — your toolkit for being and
                    building a part of this Pet Community with ease!
                  </p>
                </div>

                {/* Cursor Switch */}
                <Label className="flex items-center justify-between px-2">
                  <p className="text-lg">Cursor:</p>
                  <Switch
                    aria-label="Square switch"
                    className="rounded-xs [&_span]:rounded-xs"
                    checked={cursor}
                    onCheckedChange={(value) => setCursor(value)}
                  />
                </Label>

                <Button
                  size={"lg"}
                  variant="secondary"
                  className="flex items-center gap-3 px-3.5 py-4"
                  onClick={() => navigate("/profile")}
                >
                  <UserRound className="size-4" />
                  Profile
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      size={"lg"}
                      variant="destructive"
                      className="flex items-center gap-3 px-3.5 py-4 w-full"
                      // onClick={() => handleGoogleLogout()}
                    >
                      Logout <LogOut className="size-4" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you Absolutely Sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel size="lg" variant="secondary">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        asChild
                        onClick={() => handleGoogleLogout()}
                        size="lg"
                        variant="destructive"
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link to={"/login"}>
            <Button
              size={"lg"}
              variant={"outline"}
              className="flex items-center gap-3 px-3.5 py-4"
            >
              <LogIn className="size-4" /> Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
