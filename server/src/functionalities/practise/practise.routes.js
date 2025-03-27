import express from 'express';
import handles from './practise.js';
import jwt from '../jwt/jwt.js';

const router = express.Router();

router.get('/supabasePrac', jwt.verifyJwt, handles.uploadImg);
router.get('/select', jwt.verifyJwt, handles.database.select);


export default router;