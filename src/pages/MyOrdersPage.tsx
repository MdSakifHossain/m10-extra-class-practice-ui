// @ts-nocheck

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import axios from "axios";
import Loading from "@/components/app/feedback/Loading";
import { formatDateFromMs } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, CircleDotDashed } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notify } from "@/lib/notify";

const MyOrdersPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const { data: apiRes } = await axios.get(
          `http://localhost:3000/orders?email=${user.email}`,
        );
        console.log(apiRes);
        setMyOrders(apiRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    doTheThing();
  }, []);

  const action = (n) => {
    notify.success({ description: `Action ${n} Triggered` });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto flex-1 flex items-center justify-start flex-col gap-12">
      <h3 className="text-5xl font-medium">My Orders</h3>

      <section className="w-full flex-1">
        <Table className="border">
          <TableCaption>A list of your recent Orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Index</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {myOrders.map((order, index) => (
              <TableRow key={order?._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{order?.productName}</TableCell>
                <TableCell>{order?.price}</TableCell>
                <TableCell>{order?.phoneNumber}</TableCell>
                <TableCell>{order?.address}</TableCell>
                <TableCell>{order?.quantity}</TableCell>
                <TableCell>{formatDateFromMs(order?.date)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button>
                          <EllipsisVertical />
                        </Button>
                      }
                    />
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => action("1")}>
                        <CircleDotDashed />
                        Action 1
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => action("2")}>
                        <CircleDotDashed />
                        Action 2
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => action("3")}
                      >
                        <CircleDotDashed />
                        Action 3
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default MyOrdersPage;
