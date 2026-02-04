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
    <Card className="border shadow-none rounded-none">
      <img
        src={service.image_url}
        alt={service.name}
        className="aspect-video object-cover rounded-none"
      />
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {service.name}
          <Badge variant="default" className="rounded-full text-xs">
            {service.category}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
        <div className="flex flex-col">
          <span className="text-3xl font-semibold">${service.price}</span>
        </div>
        <Link to={`/details/${service._id}`}>
          <Button size="lg" variant="outline" className="shadow-none">
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
