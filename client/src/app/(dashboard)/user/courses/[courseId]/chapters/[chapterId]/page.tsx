"use client";

import { ReactNode, useRef } from "react";
import ReactPlayer from "react-player";
import { useCourseProgressData } from "@/hooks/useCourseProgressData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/shared/Loading";

const TABS_CONFIG = ["Notes", "Resources", "Quiz"] as const;

function ViewCoursePage() {
	const {
		user,
		course,
		userProgress,
		currentSection,
		currentChapter,
		isLoading,
		isChapterCompleted,
		updateChapterProgress,
		hasMarkedCompleted,
		setHasMarkedCompleted,
	} = useCourseProgressData();

	const playerRef = useRef<ReactPlayer>(null);

	function handleProgress({ played }: { played: number }) {
		if (
			currentChapter &&
			currentSection &&
			played >= 0.8 &&
			userProgress?.sections &&
			!hasMarkedCompleted &&
			!isChapterCompleted()
		) {
			setHasMarkedCompleted(true);
			updateChapterProgress(
				currentSection.sectionId,
				currentChapter.chapterId,
				true
			);
		}
	}

	const renderedTabContent = (tab: string): ReactNode => {
		switch (tab) {
			case TABS_CONFIG[0]:
				return currentChapter?.content;
			case TABS_CONFIG[1]:
				return <>{/* TODO: Add resources content here */}</>;
			case TABS_CONFIG[2]:
				return <>{/* TODO: Add quiz content here */}</>;
			default:
				break;
		}
	};

	if (isLoading) return <Loading />;
	if (!user) return <div>Please sign in to view this course.</div>;
	if (!course || !userProgress) return <div>Error loading course.</div>;

	return (
		<div className="flex h-[100vh]">
			<div className="flex-grow mx-auto">
				{/* BREADCRUMB */}
				<div className="mb-6">
					<div className="text-customgreys-dirtyGrey text-sm mb-2">
						{course.title} / {currentSection?.sectionTitle} /{" "}
						<span className="text-gray-400">{currentChapter?.title}</span>
					</div>
					{/* TITLE */}
					<h2 className="text-2xl text-white-50 font-semibold my-4">
						{currentChapter?.title}
					</h2>
					{/* HEADER */}
					<div className="flex justify-between items-center">
						<div className="relative mr-2 flex items-center gap-2">
							<Avatar className="w-10 h-10">
								<AvatarImage alt={course.teacherName} />
								<AvatarFallback className="text-black bg-secondary-700">
									{course.teacherName[0]}
								</AvatarFallback>
							</Avatar>
							<span className="text-customgreys-dirtyGrey text-sm font-[500]">
								{course.teacherName}
							</span>
						</div>
					</div>
				</div>

				{/* VIDEO */}
				<Card className="mb-6 !border-none">
					<CardContent className="h-[50vh] flex justify-center items-center p-0 m-0">
						{currentChapter?.video ? (
							<ReactPlayer
								ref={playerRef}
								url={currentChapter.video as string}
								controls
								width="100%"
								height="100%"
								onProgress={handleProgress}
								config={{
									file: {
										attributes: {
											controlsList: "nodownload",
										},
									},
								}}
							/>
						) : (
							/* NO VIDEO */
							<div className="text-center text-gray-500">
								No video available for this chapter.
							</div>
						)}
					</CardContent>
				</Card>

				{/* COURSE CONTENT */}
				<div className="flex gap-4 mt-12">
					{/* TABS */}
					<Tabs
						className="w-full md:w-2/3"
						defaultValue={TABS_CONFIG[0]}
					>
						<TabsList className="flex justify-start gap-10">
							{TABS_CONFIG.map((tab) => (
								<TabsTrigger
									key={tab}
									className="text-md w-20"
									value={tab}
								>
									{tab}
								</TabsTrigger>
							))}
						</TabsList>

						{TABS_CONFIG.map((tab) => (
							<TabsContent
								key={tab}
								className="mt-5"
								value={tab}
							>
								<Card className="!border-none shadow-none">
									<CardHeader className="p-2">
										<CardTitle>{tab} Content</CardTitle>
									</CardHeader>

									<CardContent className="p-2">
										{renderedTabContent(tab)}
									</CardContent>
								</Card>
							</TabsContent>
						))}
					</Tabs>

					{/* INSTRUCTOR */}
					<Card className="w-1/3 h-min border-none bg-white-50/5 p-10 bg-customgreys-secondarybg">
						<CardContent className="flex flex-col items-start p-0 px-4">
							{/* HEADER */}
							<div className="flex items-center gap-3 flex-shrink-0 mb-7">
								<Avatar className="w-10 h-10">
									<AvatarImage alt={course.teacherName} />
									<AvatarFallback className="bg-secondary-700 text-black">
										{course.teacherName[0]}
									</AvatarFallback>
								</Avatar>

								<div className="flex flex-col items-start">
									<h4 className="text-lg font-medium">{course.teacherName}</h4>

									<p className="text-sm">Senior UX Designer</p>
								</div>
							</div>

							{/* BIO */}
							<div className="text-sm">
								<p>
									A seasoned Senior UX Designer with over 15 years of experience
									in creating intuitive and engaging digital experiences.
									Expertise in leading UX design projects.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
export default ViewCoursePage;
