import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import logo from "../../assets/images/logo.png";
import { quickLinks, navLinks } from "../../utils/NavigationLinks";
import { Form, Link, NavLink } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import { FaWhatsapp } from "react-icons/fa";
import { GiChainMail } from "react-icons/gi";
import { Mail } from "lucide-react";

const Footer = () => {
  const { user } = useHomeLayoutContext();
  return (
    <footer className="bg-[var(--bs-black)] py-6  mt-4 ">
      <div className="container mx-auto px-2 space-y-4 ">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Company Info */}
          <div className="col-span-3 md:col-span-1">
            <img
              src={user.adminDetails?.image}
              alt="Logo"
              className="h-20 object-contain mb-4"
            />
            <p className="text-gray-400 mb-4">
              {user?.adminDetails?.footertext}
            </p>
            <div className="flex items-center gap-2">
              <FaPhone className="text-[--bs-green] " size={16} />-
              <a
                href={`tel:+91${user?.adminDetails?.phone}`}
                className=" block text-gray-400 cursor-pointer"
              >
                +91-{user?.adminDetails?.phone}
              </a>
            </div>
            <div className="flex items-center gap-2  mt-2">
              <Mail className="text-[--bs-red]" />-
              <a
                href={`mailto:${user?.adminDetails?.email}`}
                className="text-gray-400"
              >
                {user?.adminDetails?.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h2 className="text-xl font-sans font-bold mb-4 text-[var(--bs-white)]">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {quickLinks?.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.address}
                    className={({ isActive }) =>
                      `text-gray-400 hover:text-white transition-colors duration-300 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {user && user?.userRole === "admin" ? (
                <>
                  <li>
                    <Form method="post" action="/auth/logout">
                      <button
                        type="submit"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        Logout
                      </button>
                    </Form>
                  </li>
                  <li>
                    <NavLink
                      to={"/admin"}
                      className={({ isActive }) =>
                        `text-gray-400 hover:text-white transition-colors duration-300 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`
                      }
                    >
                      Admin things
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink
                    to={"/auth/log-in"}
                    className={({ isActive }) =>
                      `text-gray-400 hover:text-white transition-colors duration-300 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`
                    }
                  >
                    Admin Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          {/* Booking Links */}

          <div className="col-span-1">
            <h2 className="text-xl font-sans font-bold mb-4 text-[var(--bs-white)]">
              Booking
            </h2>
            <ul className="space-y-2">
              {navLinks?.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.address}
                    className={({ isActive }) =>
                      `text-gray-400 hover:text-white transition-colors duration-300 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className=" col-span-3 md:col-span-1">
            <h2 className="text-xl font-sans font-bold mb-4 text-[var(--bs-white)]">
              Social Media
            </h2>
            <div className="flex space-x-4">
              <a
                href={`${user?.adminDetails?.facebook}`}
                target="_blank"
                className="text-gray-400 hover:text-[var(--bs-text)] transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                target="_blank"
                href={`${user?.adminDetails?.instagram}`}
                className="text-gray-400 hover:text-[var(--bs-orange)] transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={`https://wa.me/${user?.adminDetails?.whatsapp}`}
                target="_blank"
                className="text-gray-400 hover:text-[var(--bs-green)] transition-colors duration-300"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 border-t border-gray-800 py-4">
          <p className="mb-12 lg:mb-0">© 2023 HappyHurry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
