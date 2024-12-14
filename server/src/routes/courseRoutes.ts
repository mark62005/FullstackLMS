import express from "express";
import { requireAuth } from "@clerk/express";
import multer, { memoryStorage } from "multer";
import {
	createCourse,
	deleteCourse,
	getCourse,
	listCourses,
	updateCourse,
} from "../controllers/courseController";

const router = express.Router();
const upload = multer({ storage: memoryStorage() });

router.get("/", listCourses);
router.post("/", requireAuth(), createCourse);

router.get("/:courseId", getCourse);
router.put("/:courseId", requireAuth(), upload.single("image"), updateCourse);
router.delete("/:courseId", requireAuth(), deleteCourse);

export default router;
