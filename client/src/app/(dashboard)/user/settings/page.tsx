import NotificationSettings from "@/components/shared/NotificationSettings";

function UserSettings() {
	return (
		<div className="w-3/5">
			<NotificationSettings
				title="User Settings"
				subtitle="Manage your notification settings"
			/>
		</div>
	);
}
export default UserSettings;
