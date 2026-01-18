// @ts-nocheck

import MarkerText from "@/components/app/appearance/MarkerText";
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
import { useParams } from "react-router";

const UpdateServicePage = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const date = parseMMDDYYYY(input);
  const params = useParams();
  const [service, setService] = useState({});
  const [category, setCategory] = useState("");

  // simple MM/DD/YYYY parser, nothing “AI-ish”
  function parseMMDDYYYY(value: string): Date | undefined {
    const parts = value.split("/");
    if (parts.length !== 3) return;
    const [mm, dd, yyyy] = parts.map(Number);
    if (!mm || !dd || !yyyy) return;
    const d = new Date(yyyy, mm - 1, dd);
    // basic sanity check
    if (d.getMonth() !== mm - 1 || d.getDate() !== dd) return;
    return d;
  }

  // human Readable format
  function formatDate(date: Date | undefined) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // for the initial date formatting
  function formatMDY(dateString) {
    const d = new Date(dateString);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const formData = {
      name: data.get("name"),
      category: data.get("category"),
      price: Number(data.get("price")),
      location: data.get("location"),
      image_url: data.get("image_url"),
      pickup_date: data.get("pickup_date"),
      description: data.get("description"),
      email: data.get("email"),
    };

    console.log(formData);
  };

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/services/${params.id}`,
        );
        setService(data);
        setCategory(data.category);
        setInput(formatMDY(data.createdAt));
      } catch (err) {
        console.error(err);
      }
    };
    doTheThing();
  }, [params.id, service]);

  return (
    <div className="bg-background flex-1 flex flex-col gap-12 items-center justify-start p-6 md:p-10">
      <MarkerText className="text-5xl italic font-medium">
        Update Service
      </MarkerText>

      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <form onSubmit={(e) => handleSubmit(e)}>
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
                <FieldLabel className="text-lg">Pickup Date</FieldLabel>
                <div className="flex flex-col gap-3">
                  <div className="relative flex gap-2">
                    <Input
                      value={input}
                      placeholder="MM/DD/YYYY"
                      name="pickup_date"
                      readOnly
                      className="bg-background text-base! px-5 py-6"
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpen(true);
                        }
                      }}
                    />

                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger className="absolute top-1/2 right-2 size-7 -translate-y-1/2 ps-80 pe-6">
                        <CalendarIcon className="size-5" />
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => {
                            if (d) setInput(d.toLocaleDateString("en-US"));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="text-muted-foreground px-1 text-sm">
                    Your Selected Date is{" "}
                    <span className="font-medium">{formatDate(date)}</span>.
                  </div>
                </div>
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
                <Button type="submit" size="lg" className="text-base">
                  Update
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateServicePage;
