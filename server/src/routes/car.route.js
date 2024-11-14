import { Router } from "express";
import { createCar, uploadAdditionalImages } from "../controller/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/carImage").post(upload.fields([
    {
        name:'image',
        maxCount:1
    }
]), verifyJWT, createCar);

router.route("/:carId/image").post(
    upload.fields([ { name: 'images', maxCount: 1 } ]), 
    verifyJWT, 
    uploadAdditionalImages 
);


export default router;