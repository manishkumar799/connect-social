import { Router } from 'express';
import chatController from './chat.controller';

const router = Router(); 

router.post("/messages/personal", chatController.sendPersonalMessage);
router.post("/messages/group", chatController.sendGroupMessage);
router.get("/messages/personal/:recipientId", chatController.getPersonalMessages);
router.get("/messages/group/:groupId", chatController.getGroupMessages);
router.get("/chats", chatController.getUserChats);
router.post("/initiate-chat", chatController.initiateChat);
export default router;