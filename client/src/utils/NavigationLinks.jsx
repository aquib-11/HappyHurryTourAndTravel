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
  },
  {
    name: "Add Hotel",
    address: "add-hotel",
  },
  {
    name: "Add Cabs",
    address: "add-cab",
  },
  {
    name: "Add Cab Pricing",
    address: "add-cab-pricing",
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
