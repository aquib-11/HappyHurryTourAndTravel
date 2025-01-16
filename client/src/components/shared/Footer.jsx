import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import logo from "../../assets/images/logo.png";
import { quickLinks, navLinks } from "../../utils/NavigationLinks";
import { Form, Link, NavLink } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const { user } = useHomeLayoutContext();
  console.log(user);
  return (
    <footer className="bg-[var(--bs-black)] py-12 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <img
              src={user.adminDetails?.image}
              alt="Logo"
              className="h-20 object-contain mb-4"
            />
            <p className="text-gray-400 mb-4">
              {user?.adminDetails?.footertext}
            </p>
            <a
              href={`tel:${user?.adminDetails?.phone}`}
              className=" block text-gray-400 mb-2 cursor-pointer"
            >
              {user?.adminDetails?.phone}
            </a>
            <a
              href={`mailto:${user?.adminDetails?.email}`}
              className="text-gray-400"
            >
              {user?.adminDetails?.email}
            </a>
          </div>

          {/* Booking Links */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4 text-[var(--bs-white)]">
              Booking
            </h2>
            <ul className="space-y-3">
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

          {/* Quick Links */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4 text-[var(--bs-white)]">
              Quick Links
            </h2>
            <ul className="space-y-3">
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

          {/* Social Media */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4 text-[var(--bs-white)]">
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
                className="text-gray-400 hover:text-[var(--bs-text)] transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={`https://wa.me/${user?.adminDetails?.whatsapp}`}
                target="_blank"
                className="text-gray-400 hover:text-[var(--bs-text)] transition-colors duration-300"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 pt-3 border-t border-gray-800 my-4 ">
          <p>© 2023 HappyHurry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
