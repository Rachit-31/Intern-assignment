import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/ApiError.js";
import apiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Car } from "../models/car.model.js";

const createCar = asyncHandler(async( req, res) => {
    const { title, description, tags } = req.body;
    const image = req.files;

    if (!title || !description || !image || image.length === 0) {
        throw new apiError(400, "Title, description, and at least one image are required");
    }
    if (!tags || !tags.car_type || !tags.company || !tags.dealer) {
        throw new apiError(400, "All tags (car_type, company, dealer) are required");
    }

    const localPath = req.files?.image[0]?.path;
    const uploadResult = await uploadOnCloudinary(localPath);
    if (!uploadResult) {
        throw new apiError(500, "Failed to upload image");
    }

    const car = await Car.create({
        title,
        description,
        images: [uploadResult.url], 
        tags,
        user: req.user._id
    });
    return res.status(201).json(
        new apiResponse(201, car, "Car created successfully with initial image")
    );
})

const uploadAdditionalImages = asyncHandler(async (req, res) => {
    const { carId } = req.params;
    const images = req.files['images'] || []; // Ensure it's an array, even if empty.

    const car = await Car.findOne({ _id: carId, user: req.user._id });
    if (!car) {
        throw new apiError(404, "Car not found or unauthorized access");
    }

    if (car.images.length + images.length > 10) {
        throw new apiError(400, "Cannot upload more than 10 images per car");
    }

    if (images.length === 0) {
        throw new apiError(400, "No images uploaded");
    }

    const uploadedImages = [];
    for (const file of images) {
        const uploadResult = await uploadOnCloudinary(file.path);
        if (!uploadResult) {
            throw new apiError(500, "Failed to upload one of the images");
        }
        uploadedImages.push(uploadResult.url);
    }

    car.images.push(...uploadedImages);
    await car.save();

    return res.status(200).json(
        new apiResponse(200, car, "Additional images uploaded successfully")
    );
});




export {
    createCar,
    uploadAdditionalImages
}