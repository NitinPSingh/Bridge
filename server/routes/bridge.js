import express from "express";
import { getQuotes, getSupportedTokens } from "../controllers/bridge.js";


const router  = express.Router();

router.get('/tokens',getSupportedTokens)
router.post('/quotes',getQuotes)


export default router;



