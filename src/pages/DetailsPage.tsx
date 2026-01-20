// @ts-nocheck

import DangerAlert from "@/components/app/alerts/DangerAlert";
import Loading from "@/components/app/feedback/Loading";
import { notify } from "@/lib/notify";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const DetailsPage = () => {
  const { id: productID } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);

  const formatDate = (gibberish) => {
    const date = new Date(gibberish);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  useEffect(() => {
    const doTheTHing = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/services/${productID}`,
        );
        setDetails(data);
      } catch (err) {
        setError(err);
        notify.danger({ title: err.code, description: err.message });
      } finally {
        setLoading(false);
      }
    };
    doTheTHing();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 flex-1 flex items-center justify-center flex-col gap-4">
        <DangerAlert title={error.code} description={error.message} />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex-1 flex items-center justify-start flex-col gap-12">
      <img
        src={details.image_url}
        alt={details.name}
        className="w-4/12 rounded-xl"
      />

      <div className="border border-primary w-full p-8 text-4xl italic font-medium flex flex-col gap-8 items-start *:flex *:gap-12">
        <p>Name: {details.name}</p>
        <p>Category: {details.category}</p>
        <p>Price: ${details.price}</p>
        <p>Location: {details.location}</p>
        <p>Pickup Date: {formatDate(details.pickup_date)}</p>
        <p>Email: {details.email}</p>
        <p>Description: {details.description}</p>
      </div>
    </div>
  );
};

export default DetailsPage;
