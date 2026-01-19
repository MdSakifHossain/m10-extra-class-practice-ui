// @ts-nocheck

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import axios from "axios";
import DangerSonner from "@/components/app/alerts/sonners/DangerSonner";
import SuccessSonner from "@/components/app/alerts/sonners/SuccessSonner";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import MarkerText from "@/components/app/appearance/MarkerText";
import { useNavigate } from "react-router";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import Loading from "@/components/app/feedback/Loading";
import { todayMs, formatDateFromMs } from "@/lib/date";

const CreateServicePage = () => {
  const [dateMs, setDateMs] = useState(() => todayMs());
  const [datePickerPopoverOpen, setDatePickerPopoverOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const formData = {
      name: data.get("name"),
      category: data.get("category"),
      price: Number(data.get("price")),
      location: data.get("location"),
      image_url: data.get("image_url"),
      pickup_date: dateMs,
      description: data.get("description"),
      email: data.get("email"),
    };

    try {
      setLoading(true);
      const { data: res } = await axios.post(
        `http://localhost:3000/services`,
        formData,
      );
      // console.log(res);
      // Green signal to go on
      toast.custom(() => (
        <SuccessSonner
          title={res.success === true && `Service Created Successfully 🥳`}
          description={res.message}
        />
      ));

      form.reset();
      navigate("/services");
    } catch (err) {
      console.error(err);
      toast.custom(() => (
        <DangerSonner title={err.name} description={err.message} />
      ));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-background flex-1 flex flex-col gap-12 items-center justify-start p-6 md:p-10">
      <MarkerText className="text-5xl italic font-medium">
        Create Service
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
                value={user?.email}
                name="email"
              />
            </FieldLabel>
          </Field>

          {/* submit button */}
          <Field>
            <Button
              type="submit"
              size="lg"
              className="text-base py-6"
              disabled={loading ? true : false}
            >
              {loading ? "Creating..." : "Create Service"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CreateServicePage;
