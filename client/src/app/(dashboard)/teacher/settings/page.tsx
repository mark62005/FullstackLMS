import NotificationSettings from "@/components/shared/NotificationSettings";

function TeacherSettings() {
	return (
		<div className="w-3/5">
			<NotificationSettings
				title="Teacher Settings"
				subtitle="Manage your teacher notification settings"
			/>
		</div>
	);
}
export default TeacherSettings;
