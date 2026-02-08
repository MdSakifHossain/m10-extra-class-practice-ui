// @ts-nocheck

import DangerAlert from "@/components/app/alerts/DangerAlert";
import Loading from "@/components/app/feedback/Loading";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, PenLine, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { notify } from "@/lib/notify";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";

const MyServicesPage = () => {
  const { user } = useAuth();
  const [myServices, setMyServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openAlertDialogue } = useAppConfig();

  const deleteThisShit = async (id) => {
    if (!id) return console.error(`id doesn't exists`);

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/services/${id}`);
      notify.success({ title: "Service Deleted Successfully" });
    } catch (err) {
      console.error(err);
      notify.danger({ title: "Internal Server Error" });
    }
  };

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/services?email=${user?.email}`,
        );
        setMyServices(data.data || []);
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
  }, [user?.email, myServices]);

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

  if (myServices.length === 0) {
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
    <div className="container mx-auto flex-1 flex items-center justify-start flex-col gap-8 lg:gap-12 px-6 lg:px-0">
      <h3 className="text-3xl lg:text-5xl font-medium">My Services</h3>

      {/* Table */}
      <Table className="lg:text-lg border">
        <TableCaption className="lg:text-lg">
          A list of your recent Posts
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={1} className="w-48">
              Image
            </TableHead>
            <TableHead className="ps-12">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price ( $ )</TableHead>
            <TableHead className="text-right pe-8">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myServices.map((service) => (
            <TableRow key={service._id}>
              <TableCell>
                <img
                  className="rounded-md w-48 aspect-video object-cover"
                  src={service.image_url}
                  alt={service.name}
                />
              </TableCell>
              <TableCell className="ps-12">{service.name}</TableCell>
              <TableCell className="capitalize">{service.category}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell className="flex items-center justify-end gap-4">
                <Link to={`/details/${service._id}`}>
                  <Button
                    className="flex items-center justify-center gap-2 px-4"
                    size="icon"
                    variant="outline"
                  >
                    <Eye className="size-4" />
                    {/* View */}
                  </Button>
                </Link>
                <Link to={`/update-service/${service._id}`}>
                  <Button
                    className="flex items-center justify-center gap-2 px-4"
                    size="icon"
                    variant="outline"
                  >
                    <PenLine className="size-4" />
                    {/* Edit */}
                  </Button>
                </Link>
                <Button
                  className="flex items-center justify-center gap-2 px-4"
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    openAlertDialogue({
                      title: "Are you absolutely sure?",
                      description: "This action cannot be undone",
                      confirmText: "Delete",
                      action: () => {
                        deleteThisShit(service._id);
                      },
                    });
                  }}
                >
                  <Trash2 className="size-5" />
                  {/* Delete */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyServicesPage;
