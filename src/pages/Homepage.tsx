// @ts-nocheck

import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";

const Homepage = () => {
  const { site_title } = useAppConfig();

  return (
    <div className="container mx-auto flex-1 flex items-center justify-start flex-col gap-12">
      <h3 className="text-4xl font-medium">Welcome to {site_title} Inc.</h3>

      <div className="border w-full flex-1 flex flex-col items-center justify-start py-4 gap-8 px-8">
        <h3 className="text-2xl font-medium">Popular Section</h3>
        <p className="text-xl leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
          tenetur. Amet expedita ducimus maxime voluptate! Quia nostrum facilis
          et vero placeat alias perspiciatis esse eligendi, pariatur dolore.
          Voluptatum, velit laboriosam.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
