import { Router } from "express";
import getUuid from "../services/uuid.js";

const router = Router();

router.get("/uuid", (req, res) => {
    const uuid = getUuid();
    res.status(200).json(uuid);
});

router.post("/readOcr", (req, res) => {
    const ocr = { test: "test" };
    res.status(200).json(ocr);
});


export default router;