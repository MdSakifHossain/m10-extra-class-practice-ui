// @ts-nocheck

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DangerSonner from "@/components/app/alerts/sonners/DangerSonner";
import DangerAlert from "@/components/app/alerts/DangerAlert";
import Loading from "@/components/app/feedback/Loading";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import ProductCard from "@/components/app/features/ProductCard";

const ServicesPage = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return (
      <div className="container mx-auto flex-1 flex items-center justify-center flex-col gap-8">
        <DangerAlert
          title="Login Required"
          description="Please log in to view services."
        />
      </div>
    );
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/services");
        setServices(data.data || []);
        setError(null);
      } catch (err) {
        setError(err);

        toast.custom(() => (
          <DangerSonner title={err.message} description={err.code} />
        ));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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

  if (services.length === 0) {
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

  // everything is all ok and theres services so it will render the whole ui
  return (
    <div className="container mx-auto flex-1 flex items-center justify-start flex-col gap-8">
      <h3 className="text-4xl italic font-medium">All Services</h3>

      <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <ProductCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
