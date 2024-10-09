import { Router } from 'express';
import messageController from './message.controller';

const router = Router(); 

router.post("/message", messageController.sendMessage);
router.get("/message/:chatId", messageController.fetchMessages);

export default router;
