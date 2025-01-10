import { UnAuthenticatedErr } from "../errors/customErors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnAuthenticatedErr("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch {
    throw new UnAuthenticatedErr("authentication invalid");
  }
};

// export const authenticateUserRole = async (req, res, next) => {
//   const { token } = req.cookies;
//   // if (!token) throw new UnAuthenticatedErr("authentication invalid");
//   try {
//     const { userId, role } = verifyJWT(token);
//     req.user = { userId, role };
//     next();
//   } catch {
//     throw new UnAuthenticatedErr("authentication invalid");
//   }
// };
