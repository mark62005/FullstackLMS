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
