import { Router } from 'express';

import articleRouter from './article';
// import userRouter from './user';
const router = new Router();

router.use('/articles', articleRouter);
// router.use('/users', userRouter);

export default router;
