// @ts-nocheck

import DangerAlert from "@/components/app/alerts/DangerAlert";
import Loading from "@/components/app/feedback/Loading";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import axios from "axios";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/date";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import { Textarea } from "@/components/ui/textarea";

const DetailsPage = () => {
  const { id: productID } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);
  const [orderDialogueStatus, setOrderDialogueStatus] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();

    // garbage collection
    const formEl = e.target;
    const form = new FormData(formEl);

    const formData = {
      productName: form.get("productName"),
      buyerName: form.get("buyerName"),
      price: Number(form.get("price")),
      quantity: Number(form.get("quantity")),
      address: form.get("address"),
      phoneNumber: form.get("phoneNumber"),
      email: form.get("email"),
      additionalNote: form.get("additionalNote"),
      productID,
      date: Date.now(),
    };

    // api call
    try {
      const { data: apiRes } = await axios.post(
        "http://localhost:3000/orders",
        formData,
      );
      setOrderDialogueStatus(false);
      notify.success({ description: apiRes.message });
      navigate("/services");
    } catch (err) {
      const error = err.response.data;
      notify.danger({
        title: `${error.count} Error`,
        description: `${error.error_message || "Something Wrong Happened."}`,
      });
    } finally {
      setLoading(false);
    }
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
  }, [productID]);

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
        <DialogContent className="sm:max-w-lg border-4">
          <DialogHeader>
            <DialogTitle>Order Form</DialogTitle>
            <DialogDescription>
              Make Sure to fill in all the Fields.
            </DialogDescription>
          </DialogHeader>

          <form
            className="w-full max-w-lg no-scrollbar max-h-[70svh] overflow-y-auto px-4"
            onSubmit={(e) => handleOrder(e)}
          >
            <FieldGroup>
              {/* Product Name */}
              <Field>
                <FieldLabel htmlFor="product-name">Product Name</FieldLabel>
                <Input
                  id="product-name"
                  type="text"
                  placeholder="Product Name"
                  defaultValue={details?.name}
                  readOnly
                  required
                  name="productName"
                />
              </Field>

              {/* Buyer Name */}
              <Field>
                <FieldLabel htmlFor="buyer-name">Buyer Name</FieldLabel>
                <Input
                  id="buyer-name"
                  type="text"
                  placeholder="Buyer Name"
                  defaultValue={user?.displayName}
                  required
                  name="buyerName"
                />
              </Field>

              {/* Product Price */}
              <Field>
                <FieldLabel htmlFor="product-price">Price</FieldLabel>
                <Input
                  id="product-price"
                  type="number"
                  placeholder="Price"
                  readOnly
                  required
                  defaultValue={details?.price}
                  name="price"
                />
              </Field>

              {/* Quantity Big number */}
              <Field>
                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>

                <div className="flex gap-2.5 items-center">
                  <Button
                    size="icon-lg"
                    variant="default"
                    className="rounded-full"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="size-4" />
                  </Button>

                  <span className="flex-1 flex items-center justify-center text-6xl">
                    {quantity}
                  </span>

                  <Button
                    size="icon-lg"
                    variant="default"
                    className="rounded-full"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </Field>

              {/* Quantity Input field */}
              <Field>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Quantity"
                  min={1}
                  value={quantity === 0 ? "" : quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                  required
                  name="quantity"
                />
              </Field>

              {/* Address */}
              <Field>
                <FieldLabel htmlFor="form-address">Address</FieldLabel>
                <Input
                  id="form-address"
                  type="text"
                  placeholder="Address"
                  required
                  name="address"
                />
              </Field>

              {/* Phone Number */}
              <Field>
                <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                <Input
                  id="form-phone"
                  type="tel"
                  placeholder="Phone"
                  defaultValue={user.phoneNumber ? user.phoneNumber : ""}
                  required
                  name="phoneNumber"
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="form-email">Email</FieldLabel>
                <Input
                  id="form-email"
                  type="email"
                  placeholder="Email"
                  readOnly
                  required
                  defaultValue={user?.email}
                  name="email"
                />
              </Field>

              {/* Additional Notes */}
              <Field>
                <FieldLabel htmlFor="form-additional-note">
                  Additional Note
                </FieldLabel>
                <Textarea
                  id="form-additional-note"
                  placeholder="Your message here"
                  name="additionalNote"
                  className="min-h-24"
                />
              </Field>

              {/* Buttons */}
              <Field orientation="horizontal" className="grid grid-cols-2">
                <Button
                  type="reset"
                  variant="outline"
                  onClick={() => setOrderDialogueStatus(false)}
                >
                  Close
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
