import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div className="flex-1 container mx-auto flex flex-col items-center justify-center gap-8 lg:gap-12 px-6 lg:px-0">
      <div className="flex-1 container mx-auto grid gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Left Section: Text */}
        <div className="flex flex-col items-center justify-center gap-1 lg:gap-4 text-center">
          <h2 className="text-2xl lg:text-5xl font-semibold">Woops!</h2>
          <h3 className="text-base lg:text-3xl font-semibold">
            Something went wrong
          </h3>
          <p className="text-xs lg:text-base text-muted-foreground max-w-sm">
            The page you&apos;re looking for isn&apos;t found, we suggest you
            back to home.
          </p>
        </div>

        {/* Right Section: Illustration */}
        <div className="w-full p-2 flex items-center justify-center">
          <img
            src="https://i.giphy.com/fmMdxlVwsCmTtA4V6a.webp"
            alt="404"
            className="rounded-3xl"
          />
        </div>
      </div>

      <Link to={"/"}>
        <Button
          size="lg"
          className="rounded-lg text-base flex items-center justify-center gap-3 px-4"
        >
          Back to home page
        </Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
