import { NotificationFrequency } from "@/types/enum";
import * as z from "zod";

/* Notification Settings Schema */
export const notificationSettingsSchema = z.object({
	courseNotifications: z.boolean(),
	emailAlerts: z.boolean(),
	smsAlerts: z.boolean(),
	notificationFrequency: z.enum([
		NotificationFrequency.Immediate,
		NotificationFrequency.Daily,
		NotificationFrequency.Weekly,
	]),
});

export type NotificationSettingsFormData = z.infer<
	typeof notificationSettingsSchema
>;

/* GUEST CHECKOUT SCHEMA */
export const guestCheckoutFormSchema = z.object({
	email: z.string().email("Invalid email address, please try again."),
});

export type GuestCheckoutFormData = z.infer<typeof guestCheckoutFormSchema>;

/* COURSE EDITOR SCHEMA */
export const courseSchema = z.object({
	courseTitle: z.string().min(1, "Title is required"),
	courseDescription: z.string().min(1, "Description is required"),
	courseCategory: z.string().min(1, "Category is required"),
	coursePrice: z.string(),
	courseStatus: z.boolean(),
});

export type CourseFormData = z.infer<typeof courseSchema>;

/* Chapter Schemas */
export const chapterSchema = z.object({
	title: z.string().min(2, "Title must be at least 2 characters"),
	content: z.string().min(10, "Content must be at least 10 characters"),
	video: z.union([z.string(), z.instanceof(File)]).optional(),
});

export type ChapterFormData = z.infer<typeof chapterSchema>;

/* Section Schemas */
export const sectionSchema = z.object({
	title: z.string().min(2, "Title must be at least 2 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),
});

export type SectionFormData = z.infer<typeof sectionSchema>;
