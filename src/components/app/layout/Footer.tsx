// @ts-nocheck

import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";

const Footer = () => {
  const { footer_text } = useAppConfig();

  return (
    <div className="flex flex-col items-center py-4 border-t">
      <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-stretchy text-center leading-28">
        {footer_text ? footer_text : "Footer"}
      </h3>
    </div>
  );
};

export default Footer;
