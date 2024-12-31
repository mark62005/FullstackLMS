import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseProgressData } from "@/hooks/useCourseProgressData";
import { useSidebar } from "@/components/ui/sidebar";
import Loading from "@/components/shared/Loading";
import Section from "./Section";

function ChaptersSidebar() {
	const router = useRouter();
	const { setOpen } = useSidebar();
	const [expandedSections, setExpandedSections] = useState<string[]>([]);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const {
		user,
		course,
		userProgress,
		chapterId,
		courseId,
		isLoading,
		updateChapterProgress,
	} = useCourseProgressData();

	useEffect(() => {
		setOpen(false);
	}, []);

	function toggleSection(sectionTitle: string) {
		setExpandedSections((prevSections) =>
			prevSections.includes(sectionTitle)
				? prevSections.filter((title) => title !== sectionTitle)
				: [...prevSections, sectionTitle]
		);
	}

	function handleChapterClick(sectionId: string, chapterId: string) {
		router.push(`/user/courses/${courseId}/chapters/${chapterId}`, {
			scroll: false,
		});
	}

	if (isLoading) return <Loading />;
	if (!user) return <div>Please sign in to view course progress.</div>;
	if (!course || !userProgress) return <div>Error loading course content</div>;

	return (
		<div
			className="
        h-screen flex-shrink-0 bg-customgreys-secondarybg border-x border-gray-700 overflow-y-auto 
        transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-left
      "
			ref={sidebarRef}
		>
			{/* HEADER */}
			<div>
				<h2 className="text-lg font-bold pt-9 pb-6 px-8">{course.title}</h2>
				{/* DIVIDER */}
				<hr className="border-gray-700" />
			</div>

			{course.sections.map((section, index) => (
				<Section
					key={section.sectionId}
					section={section}
					index={index}
					sectionProgress={userProgress.sections.find(
						(s) => s.sectionId === section.sectionId
					)}
					chapterId={chapterId as string}
					expandedSections={expandedSections}
					toggleSection={toggleSection}
					handleChapterClick={handleChapterClick}
					updateChapterProgress={updateChapterProgress}
				/>
			))}
		</div>
	);
}
export default ChaptersSidebar;
