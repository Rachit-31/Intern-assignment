import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/ApiError.js";
import apiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Car } from "../models/car.model.js";

const createCar = asyncHandler(async (req, res) => {
    const { title, description, tags } = req.body;
    const image = req.files;
  
    // Check for required fields
    if (!title || !description || !image || image.length === 0) {
      throw new apiError(400, "Title, description, and at least one image are required");
    }
  
    // Parse and validate tags
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
  
    if (!parsedTags || !parsedTags.car_type || !parsedTags.company || !parsedTags.dealer) {
      throw new apiError(400, "All tags (car_type, company, dealer) are required");
    }
  
    // Upload image to Cloudinary
    const localPath = req.files?.image[0]?.path;
    const uploadResult = await uploadOnCloudinary(localPath);
    if (!uploadResult) {
      throw new apiError(500, "Failed to upload image");
    }
  
    // Create car in the database
    const car = await Car.create({
      title,
      description,
      images: [uploadResult.url],
      tags: parsedTags,
      user: req.user._id
    });
  
    return res.status(201).json(new apiResponse(201, car, "Car created successfully with initial image"));
  });
  

const uploadAdditionalImages = asyncHandler(async (req, res) => {
    const { carId } = req.params;
    const images = req.files['images'] || []; 

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

const fetchUserProducts = asyncHandler(async (req, res) => {
    
    const userId = req.user._id; 

    
    const products = await Car.find({ user: userId });

    if (!products || products.length === 0) {
        throw new apiError(404, "No products found for this user.");
    }

    return res.status(200).json(
        new apiResponse(200, products, "Products fetched successfully.")
    );
});

const fetchPerticularCar = asyncHandler(async(req, res) => {
    const {id} = req.params;

    const car = await Car.findById(id);
    if(!car){
        throw new apiError(404, "Car not found");
    }
    return res.status(200).json(
        new apiResponse(200, car, "Car fetched succefully")
    )
})

const updateCar = asyncHandler(async (req, res) => {
    const { carId } = req.params;
    const { title, description, tags } = req.body;
    const image = req.files;

    
    const car = await Car.findById(carId);
    if (!car) {
        throw new apiError(404, "Car not found");
    }

    if (car.user.toString() !== req.user._id.toString()) {
        throw new apiError(403, "Unauthorized");
    }

    if (title) car.title = title;
    if (description) car.description = description;
    if (tags) car.tags = tags;

    if (image && image.length > 0) {
        const localPath = req.files?.image[0]?.path;
        const uploadResult = await uploadOnCloudinary(localPath);
        if (!uploadResult) {
            throw new apiError(500, "Failed to upload image");
        }
        car.images = [uploadResult.url]; 
    }

    const updatedCar = await car.save();
    return res.status(200).json(
        new apiResponse(200, updatedCar, "Car details updated successfully")
    );
});

const deleteCar = asyncHandler(async (req, res) => {
    const { carId } = req.params;

    
    const car = await Car.findById(carId);
    if (!car) {
        throw new apiError(404, "Car not found");
    }

    
    if (car.user.toString() !== req.user._id.toString()) {
        throw new apiError(403, "Unauthorized");
    }

    await car.deleteOne();
    return res.status(200).json(
        new apiResponse(200, null, "Car deleted successfully")
    );
});


export {
    createCar,
    uploadAdditionalImages,
    fetchUserProducts,
    fetchPerticularCar,
    updateCar,
    deleteCar
}