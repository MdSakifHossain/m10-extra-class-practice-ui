import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex-1 container mx-auto flex items-center justify-center flex-col gap-4">
      <Spinner className="size-14 text-primary" />
      <p className="text-4xl text-primary">Loading ...</p>
    </div>
  );
};

export default Loading;
