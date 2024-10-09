import { Router } from 'express';
import groupController from './group.controller';
const router = Router(); 
router.post("/", groupController.createGroup);
router.post("/addUser", groupController.addUserToGroup);
router.get("/:groupId", groupController.fetchGroupDetails);
export default router;