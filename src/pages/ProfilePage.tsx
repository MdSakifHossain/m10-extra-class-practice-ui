// @ts-nocheck
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin, PencilLine } from "lucide-react";
import { useAuth } from "@/contexts/authContext/AuthProvider";

const ProfilePage = () => {
  const { user } = useAuth();

  const formattedDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const userInfo = {
    email: user?.email,
    name: user?.displayName,
    avatar: user?.photoURL,
    createdAt: user?.metadata?.createdAt,
    joined: formattedDate(Number(user?.metadata?.createdAt)),
  };

  return (
    <div className="container mx-auto flex-1 flex flex-col items-center justify-center relative p-8">
      <Card className="border-2 border-transparent dark:border-primary">
        <CardContent>
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userInfo.avatar} alt="Profile" />
                <AvatarFallback className="text-2xl">
                  {userInfo.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <Button
                size="icon"
                variant="outline"
                disabled
                className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
              >
                <Camera />
              </Button>
            </div>

            <div className="flex-1 space-y-2 flex flex-col">
              <h1 className="text-2xl font-bold text-center lg:text-left">
                {userInfo.name}
              </h1>

              <p className="text-muted-foreground text-center lg:text-left">
                Junior Web Developer
              </p>

              <div className="text-muted-foreground flex flex-wrap gap-1.5 lg:gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="size-4" />
                  {userInfo.email}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {userInfo.location || "NoWhere"}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {userInfo.joined}
                </div>
              </div>
            </div>

            {/* <Button
                size="icon-lg"
                variant="outline"
                className="flex items-center justify-center gap-2 absolute top-0.5 right-0.5 rounded-full"
                >
                <PencilLine className="size-4" />
                </Button> */}
          </div>
        </CardContent>
      </Card>
      <Button
        size="lg"
        variant="outline"
        disabled
        className="flex items-center justify-center gap-2 absolute top-0 right-8 lg:right-0 rounded-full hover:scale-105"
      >
        <PencilLine className="size-4" /> Edit Profile
      </Button>
    </div>
  );
};

export default ProfilePage;

// ------------------------------------------------------------------------------
