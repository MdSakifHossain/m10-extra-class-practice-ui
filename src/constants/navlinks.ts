import {
  HomeIcon,
  Tags,
  CircleFadingPlus,
  CircleUserRound,
  Send,
  CircleDot,
  ScrollText,
} from "lucide-react";

export const nav_links = [
  {
    id: 1,
    text: "Home",
    icon: HomeIcon,
    href: "/",
    hidden: false,
  },
  {
    id: 2,
    text: "Services",
    icon: Tags,
    href: "/services",
    hidden: true,
  },
  {
    id: 3,
    text: "Create",
    icon: CircleFadingPlus,
    href: "/create",
    hidden: true,
  },
  {
    id: 4,
    text: "Profile",
    icon: CircleUserRound,
    href: "/profile",
    hidden: true,
  },
  {
    id: 5,
    text: "My Services",
    icon: ScrollText,
    href: "/my-services",
    hidden: true,
  },
  {
    id: 6,
    text: "Contact",
    icon: Send,
    href: "/contact",
    hidden: false,
  },
  {
    id: 7,
    text: "About",
    icon: CircleDot,
    href: "/about",
    hidden: false,
  },
  // Example
  // {
  //   id: 3,
  //   text: "Pages",
  //   icon: PanelTopIcon,
  //   hidden: false,
  //   children: [
  //     { text: "Landing", href: "/landing", icon: PanelTopIcon },
  //     { text: "Pricing", href: "/pricing", icon: PanelTopIcon },
  //     { text: "Checkout", href: "/checkout", icon: PanelTopIcon },
  //   ],
  // },
];
