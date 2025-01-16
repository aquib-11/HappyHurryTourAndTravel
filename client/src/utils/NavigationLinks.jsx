import { FaHome } from "react-icons/fa";
import { FaCar, FaHotel, FaNewspaper } from "react-icons/fa6";
import { GiMountainRoad } from "react-icons/gi";
import {
  MapPin,
  Building2,
  Car,
  DollarSign,
  FileEdit,
  ShoppingCart,
  Globe,
  Plane,
  Hotel,
  Route,
  PenTool,
  ShoppingBag,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    address: "/",
    icon: <FaHome />,
  },
  {
    name: "Hotel",
    address: "/all-hotels",
    icon: <FaHotel />,
  },
  {
    name: "Tours ",
    address: "/all-packages",
    icon: <GiMountainRoad />,
  },
  {
    name: "Cabs",
    address: "/cab-home",
    icon: <FaCar />,
  },
  {
    name: "Blogs",
    address: "/blog-grid",
    icon: <FaNewspaper />,
  },
];

const quickLinks = [
  {
    name: "About Us",
    address: "/about",
  },
  {
    name: "Contact Us",
    address: "/contact",
  },
  {
    name: "Cart",
    address: "/cart",
  },
];
const adminLinks = [
  {
    name: "Add Destination",
    address: "add-destination",
    icon: <MapPin />,
  },
  {
    name: "Add Hotel",
    address: "add-hotel",
    icon: <Building2 />,
  },
  {
    name: "Add Cab",
    address: "add-cab",
    icon: <Car />,
  },
  {
    name: "Add Cab Pricing",
    address: "add-cab-pricing",
    icon: <DollarSign />,
  },
  {
    name: "Add Blog",
    address: "add-blog",
    icon: <FileEdit />,
  },
  {
    name: "Cart",
    address: "/cart",
    icon: <ShoppingCart />,
  },
];

export { quickLinks, navLinks, adminLinks };
