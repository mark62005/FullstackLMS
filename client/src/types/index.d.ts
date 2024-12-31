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

	interface CustomJwtSessionClaims {
		userType: "teacher" | "student";
	}

	enum NotificationFrequency {
		Immediate = NotificationFrequencyFromModule.Immediate,
		Daily = NotificationFrequencyFromModule.Daily,
		Weekly = NotificationFrequencyFromModule.Weekly,
	}

	/* TRANSACTION */
	interface Transaction {
		userId: string;
		transactionId: string;
		dateTime: string;
		courseId: string;
		paymentProvider: "stripe";
		paymentMethodId?: string;
		amount: number; // Stored in cents
		savePaymentMethod?: boolean;
	}

	/* USER COURSE PROGRESS */
	interface UserCourseProgress {
		userId: string;
		courseId: string;
		enrollmentDate: string;
		overallProgress: number;
		sections: SectionProgress[];
		lastAccessedTimestamp: string;
	}

	interface ChapterProgress {
		chapterId: string;
		completed: boolean;
	}

	interface SectionProgress {
		sectionId: string;
		chapters: ChapterProgress[];
	}

	interface DateRange {
		from: string | undefined;
		to: string | undefined;
	}
}

export {};
