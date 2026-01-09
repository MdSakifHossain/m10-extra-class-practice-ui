// @ts-nocheck

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import InputField from "@/components/app/forms/InputField";
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
import DangerAlert from "@/components/app/alerts/DangerAlert";
import MarkerText from "@/components/app/appearance/MarkerText";
import { useNavigate } from "react-router";

const CreateServicePage = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const date = parseMMDDYYYY(input);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { email: userEmail } = user || {};

  function formatDate(date: Date | undefined) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

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
      pickup_date: data.get("pickup_date"),
      description: data.get("description"),
      email: data.get("email"),
    };

    const emptyFields = Object.keys(formData).filter((key) => {
      const value = formData[key];

      // numbers: accept 0, reject NaN
      if (typeof value === "number") {
        return isNaN(value);
      }

      // strings: reject empty/whitespace
      if (typeof value === "string") {
        return value.trim() === "";
      }

      // null / undefined
      return value == null;
    });

    if (emptyFields.length > 0) {
      toast.custom(() => (
        <DangerSonner
          title="Please fill out All Fields"
          description={`Missing: ${emptyFields.join(", ")}`}
        />
      ));
      return;
    }

    try {
      setLoading(true);
      const { data: res } = await axios.post(
        `http://localhost:3000/services`,
        formData
      );
      console.log(res);
      // Green signal to go on
      toast.custom(() => (
        <SuccessSonner
          title={res.success === true && `Service Created Successfully 🥳`}
          description={res.message}
        />
      ));

      form.reset();
      setInput("");
      setCategory("");
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

  return (
    <div className="container mx-auto flex-1 flex flex-col items-center gap-16">
      <MarkerText className="text-5xl italic font-medium">
        Create Service
      </MarkerText>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Create Service</CardTitle>
          <CardDescription className="text-center">
            Enter Essentials for Making a Service
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-6"
          >
            {/* Product Name */}
            <InputField>
              <Label className="text-lg">Product / Pet Name</Label>
              <Input
                placeholder="Product Name"
                type="text"
                name="name"
                className="text-lg! px-5 py-6"
              />
            </InputField>

            {/* Category */}
            <InputField>
              <Label className="text-lg">Category</Label>

              <Select
                name="category"
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger className="w-full py-6 text-lg!">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="**:text-lg!">
                  <SelectItem value="">Select a Category</SelectItem>
                  <SelectItem value="pet">Pet</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="care-products">Care Products</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            {/* Price */}
            <InputField>
              <Label className="text-lg">Price</Label>
              <Input
                placeholder="Price"
                type="number"
                name="price"
                className="text-lg! px-5 py-6"
              />
            </InputField>

            {/* Location */}
            <InputField>
              <Label className="text-lg">Location</Label>
              <Input
                placeholder="Location"
                type="text"
                name="location"
                className="text-lg! px-5 py-6"
              />
            </InputField>

            {/* Description */}
            <InputField>
              <Label className="text-lg">Description</Label>
              <Textarea
                placeholder="Description"
                name="description"
                className="text-lg! h-32 py-4 px-5"
              />
            </InputField>

            {/* Image url */}
            <InputField>
              <Label className="text-lg">Image (URL)</Label>
              <Input
                placeholder="Image"
                type="url"
                name="image_url"
                className="text-lg! px-5 py-6"
              />
            </InputField>

            {/* Pick Up Date */}
            <InputField>
              <Label className="text-lg">Pickup Date</Label>
              <div className="flex flex-col gap-3">
                <div className="relative flex gap-2">
                  <Input
                    value={input}
                    placeholder="MM/DD/YYYY"
                    name="pickup_date"
                    readOnly
                    className="bg-background text-lg! px-5 py-6"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="absolute top-1/2 right-6 size-6 -translate-y-1/2"
                      >
                        <CalendarIcon className="size-6" />
                        <span className="sr-only">Select date</span>
                      </Button>
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
            </InputField>

            {/* Email */}
            <InputField>
              <Label className="text-lg">Email</Label>
              <Input
                placeholder="Email"
                type="email"
                name="email"
                readOnly
                value={userEmail}
                className="text-lg! px-5 py-6"
              />
            </InputField>

            <Button type="submit" disabled={loading} className="text-xl py-7">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateServicePage;
