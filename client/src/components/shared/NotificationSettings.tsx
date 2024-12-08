"use client";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	NotificationSettingsFormData,
	notificationSettingsSchema,
} from "@/lib/schema";
import { useUpdateUserMutation } from "@/state/api";
import { NotificationFrequency } from "@/types/enum";
import ProfileHeader from "./ProfileHeader";
import { Form } from "../ui/form";
import CustomFormField from "./form/CustomFormField";
import { capitalize } from "@/lib/utils";
import { Button } from "../ui/button";

const NOTIFICATION_SETTINGS = [
	{
		name: "courseNotifications",
		label: "Course Notifications",
		type: "switch",
	},
	{
		name: "emailAlerts",
		label: "Email Alerts",
		type: "switch",
	},
	{
		name: "smsAlerts",
		label: "SMS Alerts",
		type: "switch",
	},
	{
		name: "notificationFrequency",
		label: "Notification Frequency",
		type: "select",
		options: [
			{
				value: NotificationFrequency.Immediate,
				label: capitalize(NotificationFrequency.Immediate),
			},
			{
				value: NotificationFrequency.Daily,
				label: capitalize(NotificationFrequency.Daily),
			},
			{
				value: NotificationFrequency.Weekly,
				label: capitalize(NotificationFrequency.Weekly),
			},
		],
	},
];

interface NotificationSettingsProps {
	title?: string;
	subtitle?: string;
}

function NotificationSettings({
	title = "Notification Settings",
	subtitle = "Manage your notification settings",
}: NotificationSettingsProps) {
	const { user } = useUser();
	const [updateUser] = useUpdateUserMutation();

	const currentSettings =
		(user?.publicMetadata as { settings?: UserSettings })?.settings || {};

	const methods = useForm<NotificationSettingsFormData>({
		resolver: zodResolver(notificationSettingsSchema),
		defaultValues: {
			courseNotifications: currentSettings.courseNotifications || false,
			emailAlerts: currentSettings.emailAlerts || false,
			smsAlerts: currentSettings.smsAlerts || false,
			notificationFrequency:
				currentSettings.notificationFrequency || NotificationFrequency.Daily,
		},
	});

	const onSubmit = async (data: NotificationSettingsFormData) => {
		if (!user) return;

		const updatedUser = {
			userId: user.id,
			publicMetadata: {
				...user.publicMetadata,
				settings: {
					...currentSettings,
					...data,
				},
			},
		};

		try {
			await updateUser(updatedUser);
		} catch (error) {
			console.error("Failed to update user settings: ", error);
		}
	};

	if (!user) return <div>Please sign in to manage your settings.</div>;

	return (
		<div className="space-y-4">
			<ProfileHeader
				title={title}
				subtitle={subtitle}
			/>

			<Form {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<div className="space-y-6">
						{NOTIFICATION_SETTINGS.map((setting) => (
							<CustomFormField
								key={setting.name}
								name={setting.name}
								label={setting.label}
								type={setting.type as "switch" | "select"}
								options={setting.options}
							/>
						))}
					</div>

					<Button
						type="submit"
						className="
							!mt-8 text-gray-100 bg-primary-700
							hover:bg-primary-600
						"
					>
						Update Settings
					</Button>
				</form>
			</Form>
		</div>
	);
}
export default NotificationSettings;
