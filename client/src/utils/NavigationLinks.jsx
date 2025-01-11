import { FaCar, FaHotel, FaNewspaper } from "react-icons/fa6";
import { GiMountainRoad } from "react-icons/gi";
const navLinks = [
  {
    name: "Hotel",
    address: "/",
    icon: <FaHotel />,
  },
  {
    name: "Tours ",
    address: "/tour",
    icon: <GiMountainRoad />,
  },
  {
    name: "Cabs",
    address: "/cabs",
    icon: <FaCar />,
  },
  {
    name: "Blogs",
    address: "/Blogs",
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
  },
  {
    name: "Contact Us",
    address: "/contact",
  },
  {
    name: "Cart",
    address: "/cart",
  },
  {
    name: "Cart",
    address: "/cart",
  },
  {
    name: "Cart",
    address: "/cart",
  },
  {
    name: "Cart",
    address: "/cart",
  },

  {
    name: "Cart",
    address: "/cart",
  },
];

export { quickLinks, navLinks, adminLinks };
