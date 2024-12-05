import { NotificationFrequency as NotificationFrequencyFromModule } from "./enum";

declare global {
	/* COURSE */
	interface Course {
		courseId: string;
		teacherId: string;
		teacherName: string;
		title: string;
		description?: string;
		category: string;
		image?: string;
		price?: number; // Stored in cents (e.g., 4999 for $49.99)
		level: "Beginner" | "Intermediate" | "Advanced";
		status: "Draft" | "Published";
		sections: Section[];
		enrollments?: Array<{
			userId: string;
		}>;
	}

	interface Section {
		sectionId: string;
		sectionTitle: string;
		sectionDescription?: string;
		chapters: Chapter[];
	}

	interface Chapter {
		chapterId: string;
		title: string;
		content: string;
		video?: string | File;
		freePreview?: boolean;
		type: "Text" | "Quiz" | "Video";
	}
	interface Comment {
		commentId: string;
		userId: string;
		text: string;
		timestamp: string;
	}

	/* CLERK USER */
	interface User {
		userId: string;
		firstName?: string;
		lastName?: string;
		username?: string;
		email: string;
		publicMetadata: {
			userType: "teacher" | "student";
		};
		privateMetadata: {
			settings?: UserSettings;
			// TODO: Payment info
		};
	}

	interface UserSettings {
		emailAlerts?: boolean;
		smsAlerts?: boolean;
		courseNotifications?: boolean;
		notificationFrequency?: NotificationFrequency;
	}

	enum NotificationFrequency {
		Immediate = NotificationFrequencyFromModule.Immediate,
		Daily = NotificationFrequencyFromModule.Daily,
		Weekly = NotificationFrequencyFromModule.Weekly,
	}
}

export {};
