import { Router } from "express";
import { chechAuth } from "../middleware/ProtectedRoutesMiddleware.js";

export const router = Router();

router.get("/cart", chechAuth, (req, res) => {
  const {userId, userName, role}= req.userInfo;
  res.json({
    message: "Logged In User can see their Cart status",
    data: {userId, userName, role},
  });
});

router.get("/profile", chechAuth, (req, res) => {
  const {userId, userName, role}= req.userInfo;
  res.json({
    message: "Logged In User can see their Profile Page",
    data: {userId, userName, role},
  });
});
