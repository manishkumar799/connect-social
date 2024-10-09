import { Router } from 'express';
import userRoutes from './user/user.routes'
import groupRoutes from './group/group.routes'
import messageRoutes from './message/message.routes'
import chatRoutes from './chat/chat.routes'

const router = Router(); 

router.use('/user', userRoutes);
router.use('/group', groupRoutes);
router.use('/message', messageRoutes);
router.use('/chat', chatRoutes);

export default router;
