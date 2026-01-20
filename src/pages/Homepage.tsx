// @ts-nocheck

import DangerAlert from "@/components/app/alerts/DangerAlert";
import ProductCard from "@/components/app/features/ProductCard";
import Loading from "@/components/app/feedback/Loading";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { notify } from "@/lib/notify";

const Homepage = () => {
  const { site_title, popular_items_limit } = useAppConfig();
  const [popularServices, setPopularServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/services");
        setPopularServices(data.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
        notify.danger({ title: err.message, description: err.code });
      } finally {
        setLoading(false);
      }
    };
    doTheThing();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error && error.code === "ERR_NETWORK") {
    return (
      <div className="container mx-auto p-8 flex-1 flex items-center justify-center flex-col gap-4">
        {/* <p>Couldn't reach the server. Check your backend or network. 🚨</p> */}
        <DangerAlert
          title={error.message}
          description="Couldn't reach the server. Check your backend or network. 🚨"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 flex-1 flex items-center justify-center flex-col gap-4">
        {/* <p>Something went wrong fetching services. ❌</p> */}
        <DangerAlert
          title={error.message}
          description="Something went wrong fetching services. ❌"
        />
      </div>
    );
  }

  if (popularServices.length === 0) {
    return (
      <div className="container mx-auto p-8 flex-1 flex items-center justify-center flex-col gap-4">
        {/* <p>No services found. Add something first. 🪫</p> */}
        <DangerAlert
          title={"No services found"}
          description={`Add something first and try again 🪫`}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex-1 flex items-center justify-start flex-col gap-12">
      <h3 className="text-4xl font-medium">Welcome to {site_title} Inc.</h3>

      <div className="w-full flex-1 flex flex-col items-center justify-start py-4 gap-8 px-8">
        <h3 className="text-2xl font-medium">Popular Services</h3>

        <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularServices.slice(0, popular_items_limit).map((service) => (
            <ProductCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
