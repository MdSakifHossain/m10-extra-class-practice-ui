// @ts-nocheck
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  // CardContent,
} from "@/components/ui/card";
import { Link } from "react-router";

const ProductCard = ({ service }) => {
  return (
    <div className="max-w-md rounded-xl">
      <div className="flex items-center justify-center">
        <img
          src={service.image_url}
          alt={service.name}
          className="aspect-video object-cover rounded-t-md"
        />
      </div>
      <Card className="rounded-t-none">
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-sm text-xs">
              {service.category}
            </Badge>
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
          <p>{service.description}</p>
        </CardContent> */}
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">${service.price}</span>
          </div>
          <Link to={`/details/${service._id}`}>
            <Button size="lg" variant="outline">
              Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
