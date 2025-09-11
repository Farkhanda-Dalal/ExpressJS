import { Router } from "express";
import { chechAuth } from "../middleware/ProtectedRoutesMiddleware.js";
import { checkRole } from "../middleware/AdminRoutesMiddleware.js";

export const router=Router();

router.get("/salesReport", chechAuth , checkRole ,(req, res) => { 
    res.json({
        message: "Reached admin router to see sales report",
        data: req.userInfo
    })
 })