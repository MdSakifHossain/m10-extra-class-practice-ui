// @ts-nocheck

import DangerAlert from "@/components/app/alerts/DangerAlert";
import DangerSonner from "@/components/app/alerts/sonners/DangerSonner";
import Loading from "@/components/app/feedback/Loading";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PenLine, Trash2 } from "lucide-react";

const MyServicesPage = () => {
  const { user } = useAuth();
  const [myServices, setMyServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/services?email=${user?.email}`,
        );
        setMyServices(data.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
        toast.custom(() => (
          <DangerSonner title={err.message} description={err.code} />
        ));
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
    <div className="container mx-auto flex-1 flex items-center justify-start flex-col gap-12">
      <h3 className="text-4xl font-medium">MyServices Page</h3>

      <Table className="text-lg">
        <TableCaption className="text-lg">
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
              <TableCell className="flex items-center justify-end gap-8 pe-8">
                <Button
                  className="flex items-center justify-center gap-2 px-4 rounded-full"
                  size="lg"
                  variant="outline"
                >
                  Edit <PenLine />
                </Button>
                <Button
                  className="flex items-center justify-center gap-2 px-4"
                  size="icon-lg"
                  variant="destructive"
                >
                  <Trash2 className="size-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
};

export default MyServicesPage;
