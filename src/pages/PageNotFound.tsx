import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div className="flex-1 container mx-auto flex flex-col items-center justify-center">
      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left Section: Illustration */}
        <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
          <h2 className="mb-6 text-5xl font-semibold">Whoops!</h2>
          <h3 className="mb-1.5 text-3xl font-semibold">
            Something went wrong
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
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
