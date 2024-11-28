export interface Course {
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

export interface Section {
	sectionId: string;
	sectionTitle: string;
	sectionDescription?: string;
	chapters: Chapter[];
}

export interface Chapter {
	chapterId: string;
	title: string;
	content: string;
	video?: string | File;
	freePreview?: boolean;
	type: "Text" | "Quiz" | "Video";
}
export interface Comment {
	commentId: string;
	userId: string;
	text: string;
	timestamp: string;
}
