import express from 'express';
import multer from 'multer';
import { processCSV } from '../operations/upload/processCSV';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), processCSV);

export default router;
