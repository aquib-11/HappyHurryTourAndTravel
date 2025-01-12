// POST /api/v1/price-lists
// Body:
// {
//     "destination": "Srinagar Local Sightseeing",
//     "prices": [
//         {
//             "cab": "cab_id_1",  // MongoDB ID of the cab
//             "price": 2300
//         },
//         {
//             "cab": "cab_id_2",  // MongoDB ID of another cab
//             "price": 3500
//         }
//     ]
// }
import PriceList from "../models/priceListModel.js";
import { StatusCodes } from "http-status-codes";
import { badRequestErr, NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";

// Get all price lists with populated cab details
export const getAllPriceLists = async (req, res) => {
  const priceLists = await PriceList.find({})
    .populate({
      path: 'prices.cab',
      select: 'name type seatingCapacity'
    });
  res.status(StatusCodes.OK).json({ priceLists });
};

// Create price list entry
export const createPriceList = async (req, res) => {
  if (req.user.role !== "admin") {
    throw new UnauthorizedErr("Only admin can create price lists");
  }

  const { destination, prices } = req.body;

  if (!prices || !Array.isArray(prices) || prices.length === 0) {
    throw new badRequestErr("Prices array is required with at least one cab price");
  }

  const priceList = await PriceList.create({
    destination,
    prices,
    createdBy: req.user._id,
  });

  const populatedPriceList = await PriceList.findById(priceList._id)
    .populate({
      path: 'prices.cab',
      select: 'name type seatingCapacity'
    });

  res.status(StatusCodes.CREATED).json({ priceList: populatedPriceList });
};

// Update price list entry
export const updatePriceList = async (req, res) => {
  if (req.user.role !== "admin") {
    throw new UnauthorizedErr("Only admin can update price lists");
  }

  const { id } = req.params;
  const { destination, prices } = req.body;

  if (prices && (!Array.isArray(prices) || prices.length === 0)) {
    throw new BadRequestError("Prices must be an array with at least one cab price");
  }

  const priceList = await PriceList.findByIdAndUpdate(
    id,
    { destination, prices },
    { new: true }
  ).populate({
    path: 'prices.cab',
    select: 'name type seatingCapacity'
  });

  if (!priceList) {
    throw new NotFoundErr(`No price list found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ priceList });
};

// Delete price list entry
export const deletePriceList = async (req, res) => {
  if (req.user.role !== "admin") {
    throw new UnauthorizedErr("Only admin can delete price lists");
  }

  const { id } = req.params;
  const priceList = await PriceList.findById(id);

  if (!priceList) {
    throw new NotFoundErr(`No price list found with id ${id}`);
  }

  await PriceList.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "Price list deleted successfully" });
};
