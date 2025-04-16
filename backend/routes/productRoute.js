import express from 'express';
import { addProduct, listProducts, removeProducts, singleProducts } from "../controllers/productControllers.js";
import upload from '../middleware/multer.js';
import admintAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Adding product with multiple images
productRouter.post('/add', admintAuth, upload.fields([
    { name: 'image1', admintAuth, maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

// Removing product(s)
productRouter.post('/remove', removeProducts);

// Get a single product
productRouter.post('/single', singleProducts); // Assuming this is the intended endpoint name

// List all products
productRouter.get('/list', listProducts);

export default productRouter;
