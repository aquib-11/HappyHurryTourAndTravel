import React, { useEffect, useState } from "react";
import { X, Calendar, Users, MessageSquare } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

const PackageBookingModal = ({
  showBookingModal,
  setShowBookingModal,
  _package,
}) => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    selectPackage: _package?._id,
  });

  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        const { data } = await customFetch.get("/tourPackage");
        setPackages(data.packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchAllPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return toast.error("Please login to book a package");
    }
    try {
      await customFetch.post("/bookPackage", formData);
      toast.success("Package Booked Successfully");
      setShowBookingModal(false);
    } catch (error) {
      toast.error("Failed to book package");
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setShowBookingModal(false)}
      />

      {/* Modal Container */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-gray-800/90 shadow-xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Book Package</h2>
            <button
              onClick={() => setShowBookingModal(false)}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, customerEmail: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, customerPhone: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, travelDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Package Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Package Details
            </h3>
            <select
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              defaultValue={_package?._id}
              onChange={(e) =>
                setFormData({ ...formData, selectPackage: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select Package
              </option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.name}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Adults
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, totalAdults: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Children
                </label>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, totalChildren: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Infants
                </label>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, totalInfants: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Additional Information
            </h3>
            <textarea
              rows={4}
              placeholder="Any special requirements or questions?"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-colors"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PackageBookingModal;