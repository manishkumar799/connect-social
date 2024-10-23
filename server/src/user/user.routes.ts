import { Router } from 'express';
import userController from './user.controller';

const router = Router(); 
// router.post("/register", userController.registerUser);
// router.post("/login", userController.loginUser);
router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUsers);
router.get('/search', userController.getUserBySearch);

export default router;