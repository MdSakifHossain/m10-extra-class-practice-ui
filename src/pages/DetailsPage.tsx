// @ts-nocheck

import DangerAlert from "@/components/app/alerts/DangerAlert";
import Loading from "@/components/app/feedback/Loading";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DetailsPage = () => {
  const { id: productID } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);
  const [orderDialogueStatus, setOrderDialogueStatus] = useState(false);

  const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
  ];

  const handleOrder = (e) => {
    e.preventDefault();
    console.log("form-submition-initiated");
  };

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
    <>
      {/* Visible Content */}
      <div className="container mx-auto flex-1 flex items-center justify-start flex-col gap-12 relative">
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

        <Button
          size="lg"
          variant="outline"
          className="absolute right-0 rounded-full px-4"
          onClick={() => setOrderDialogueStatus(true)}
        >
          <ShoppingCart />
          Order
        </Button>
      </div>

      {/* Invisbel content */}
      <Dialog open={orderDialogueStatus} onOpenChange={setOrderDialogueStatus}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <form className="w-full max-w-sm" onSubmit={(e) => handleOrder(e)}>
            <FieldGroup>
              {/* Name */}
              <Field>
                <FieldLabel htmlFor="form-name">Name</FieldLabel>
                <Input id="form-name" type="text" placeholder="Product Name" />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="form-email">Email</FieldLabel>
                <Input id="form-email" type="email" placeholder="Email" />
              </Field>

              {/* Grid of 2 */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                  <Input id="form-phone" type="tel" placeholder="Phone" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="form-country">Country</FieldLabel>
                  <Select items={countries} defaultValue="us">
                    <SelectTrigger id="form-country">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {/* Address */}
              <Field>
                <FieldLabel htmlFor="form-address">Address</FieldLabel>
                <Input
                  id="form-address"
                  type="text"
                  placeholder="123 Main St"
                />
              </Field>

              {/* Buttons */}
              <Field orientation="horizontal" className="grid grid-cols-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>

                <Button type="submit" variant="default">
                  Order
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailsPage;
