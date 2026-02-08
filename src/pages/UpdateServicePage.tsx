// @ts-nocheck

import DangerAlert from "@/components/app/alerts/DangerAlert";
import MarkerText from "@/components/app/appearance/MarkerText";
import Loading from "@/components/app/feedback/Loading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { formatDateFromMs } from "@/lib/date";
import { notify } from "@/lib/notify";

const UpdateServicePage = () => {
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({});
  const [dateMs, setDateMs] = useState(null);
  const [datePickerPopoverOpen, setDatePickerPopoverOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const formData = {
      name: data.get("name").trim(),
      category: data.get("category").trim(),
      price: Number(data.get("price")),
      location: data.get("location").trim(),
      image_url: data.get("image_url").trim(),
      pickup_date: dateMs,
      description: data.get("description").trim(),
      email: data.get("email").trim(),
    };

    try {
      const { data: res } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/update/${params.id}`,
        formData,
      );
      // console.log(res);
      notify.success({
        title: res.success === true && "Success",
        description: res.message,
      });
      navigate(`/my-services`);
    } catch (err) {
      console.error(err);
      notify.danger({ title: err.name, description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const doTheThing = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/services/${params.id}`,
        );
        setService(data);
        setCategory(data.category);
        setDateMs(data.pickup_date);
        setError(null);
        // console.log("Initial Fetch", data);
      } catch (err) {
        console.error(err);
        setError(err);
        notify.danger({ title: err.name, description: err.message });
        form.reset();
        navigate(`/services/${params.id}`);
      } finally {
        setLoading(false);
      }
    };
    doTheThing();
  }, [params.id]);

  if (loading) return <Loading />;

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

  return (
    <div className="bg-background flex-1 flex flex-col gap-12 items-center justify-start p-6 md:p-10">
      <MarkerText className="text-3xl lg:text-5xl italic font-medium">
        Update Service
      </MarkerText>

      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-3xl">
        <FieldGroup>
          {/* Product Name */}
          <Field>
            <FieldLabel className="flex flex-col items-start gap-2.5">
              <span className="text-base">Name</span>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                className="py-6 px-4 text-base! placeholder:font-normal"
                required
                defaultValue={service.name}
              />
            </FieldLabel>
          </Field>

          {/* Category */}
          <Field>
            <FieldLabel className="flex flex-col items-start gap-2.5">
              <span className="text-base">Category</span>

              <NativeSelect
                className="w-full"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <NativeSelectOption value="">
                  Select a Category
                </NativeSelectOption>
                <NativeSelectOption value="pet">Pet</NativeSelectOption>
                <NativeSelectOption value="food">Food</NativeSelectOption>
                <NativeSelectOption value="accessories">
                  Accessories
                </NativeSelectOption>
                <NativeSelectOption value="care-products">
                  Care Products
                </NativeSelectOption>
              </NativeSelect>
            </FieldLabel>
          </Field>

          {/* Price */}
          <Field>
            <FieldLabel className="flex flex-col items-start gap-2.5">
              <span className="text-base">Price</span>
              <Input
                type="number"
                placeholder="Price"
                name="price"
                className="py-6 px-4 text-base! placeholder:font-normal"
                required
                defaultValue={service.price}
              />
            </FieldLabel>
          </Field>

          {/* Location */}
          <Field>
            <FieldLabel className="flex flex-col items-start gap-2.5">
              <span className="text-base">Location</span>
              <Input
                type="text"
                placeholder="Location"
                name="location"
                className="py-6 px-4 text-base! placeholder:font-normal"
                required
                defaultValue={service.location}
              />
            </FieldLabel>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel className="flex flex-col items-start gap-2.5">
              <span className="text-base">Description</span>
              <Textarea
                placeholder="Description"
                name="description"
                required
                defaultValue={service.description}
                className="text-base! h-32 py-3 px-4 placeholder:font-normal"
              />
            </FieldLabel>
          </Field>

          {/* Image url */}
          <Field>
            <FieldLabel className="flex flex-col items-start gap-2.5">
              <span className="text-base">Image URL</span>
              <Input
                type="url"
                placeholder="Image URL"
                className="py-6 px-4 text-base! placeholder:font-normal"
                required
                defaultValue={service.image_url}
                name="image_url"
              />
            </FieldLabel>
          </Field>

          {/* Pick Up Date */}
          <Field>
            <FieldLabel className="flex flex-col items-start gap-2.5">
              <span className="text-base">Pick Up Date</span>
              <div className="relative w-full">
                <Input
                  readOnly
                  value={formatDateFromMs(dateMs)}
                  className="bg-background py-6 px-4 cursor-pointer text-base! placeholder:font-normal"
                  onClick={() => setDatePickerPopoverOpen(true)}
                />

                <Popover
                  open={datePickerPopoverOpen}
                  onOpenChange={setDatePickerPopoverOpen}
                >
                  <PopoverTrigger>
                    <CalendarIcon className="size-5 absolute top-1/2 right-5 -translate-y-1/2" />
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={new Date(dateMs)}
                      onSelect={(date) => {
                        if (!date) return;
                        setDateMs(date.getTime());
                        setDatePickerPopoverOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </FieldLabel>
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel className="flex flex-col items-start gap-2.5">
              <span className="text-base">Email</span>
              <Input
                type="email"
                placeholder="Email"
                className="py-6 px-4 text-base! placeholder:font-normal"
                required
                readOnly
                defaultValue={user?.email}
                name="email"
              />
            </FieldLabel>
          </Field>

          {/* submit button */}
          <Field>
            <Button type="submit" size="lg" className="text-base py-6">
              Update
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default UpdateServicePage;
