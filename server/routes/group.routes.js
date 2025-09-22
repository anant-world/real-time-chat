import { Router } from "express";
import { isAuthenticated } from "../auth/auth";

const router = Router();

// routes
router.post("/create", isAuthenticated,createGroup);

export default router;
