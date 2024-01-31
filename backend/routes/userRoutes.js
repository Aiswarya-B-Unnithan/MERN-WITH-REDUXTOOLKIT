
import express from "express";
const router = express.Router();
import {
    authUser,
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile,
    // adminLogin
} from "../controllers/userControllers.js";
import { protect } from "../middileware/authMiddleware.js";

router.post('/auth', authUser); 
router.post('/register', registerUser);
router.post('/logout', logOutUser); 

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);


export default router;
