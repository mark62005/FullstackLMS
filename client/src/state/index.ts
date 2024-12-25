import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
	courseEditor: {
		sections: Section[];
		isSectionModalOpen: boolean;
		isChapterModalOpen: boolean;
		selectedSectionIndex: number | null;
		selectedChapterIndex: number | null;
	};
}

const initialState: InitialStateType = {
	courseEditor: {
		sections: [],
		isSectionModalOpen: false,
		isChapterModalOpen: false,
		selectedSectionIndex: null,
		selectedChapterIndex: null,
	},
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setSections: (state, action: PayloadAction<Section[]>) => {
			state.courseEditor.sections = action.payload;
		},
		openSectionModal: (
			state,
			action: PayloadAction<{
				sectionIndex: number | null;
			}>
		) => {
			state.courseEditor.isSectionModalOpen = true;
			state.courseEditor.selectedSectionIndex = action.payload.sectionIndex;
		},
		closeSectionModal: (state) => {
			state.courseEditor.isSectionModalOpen = false;
			state.courseEditor.selectedSectionIndex = null;
		},
		openChapterModal: (
			state,
			action: PayloadAction<{
				sectionIndex: number | null;
				chapterIndex: number | null;
			}>
		) => {
			state.courseEditor.isChapterModalOpen = true;
			state.courseEditor.selectedSectionIndex = action.payload.sectionIndex;
			state.courseEditor.selectedChapterIndex = action.payload.chapterIndex;
		},
		closeChapterModal: (state) => {
			state.courseEditor.isChapterModalOpen = false;
			state.courseEditor.selectedSectionIndex = null;
			state.courseEditor.selectedChapterIndex = null;
		},
		addSection: (state, action: PayloadAction<Section>) => {
			state.courseEditor.sections.push(action.payload);
		},
		editSection: (
			state,
			action: PayloadAction<{ sectionIndex: number; section: Section }>
		) => {
			const { sectionIndex, section } = action.payload;
			state.courseEditor.sections[sectionIndex] = section;
		},
		deleteSection: (state, action: PayloadAction<{ sectionIndex: number }>) => {
			state.courseEditor.sections.splice(action.payload.sectionIndex, 1);
		},
		addChapter: (
			state,
			action: PayloadAction<{
				sectionIndex: number;
				chapter: Chapter;
			}>
		) => {
			const { sectionIndex, chapter } = action.payload;
			state.courseEditor.sections[sectionIndex].chapters.push(chapter);
		},
		editChapter: (
			state,
			action: PayloadAction<{
				sectionIndex: number;
				chapterIndex: number;
				updatedChapter: Chapter;
			}>
		) => {
			const { sectionIndex, chapterIndex, updatedChapter } = action.payload;
			state.courseEditor.sections[sectionIndex].chapters[chapterIndex] =
				updatedChapter;
		},
		deleteChapter: (
			state,
			action: PayloadAction<{
				sectionIndex: number;
				chapterIndex: number;
			}>
		) => {
			const { sectionIndex, chapterIndex } = action.payload;
			state.courseEditor.sections[sectionIndex].chapters.splice(
				chapterIndex,
				1
			);
		},
	},
});

export const {
	setSections,
	openSectionModal,
	openChapterModal,
	closeSectionModal,
	closeChapterModal,
	addSection,
	editSection,
	deleteSection,
	addChapter,
	editChapter,
	deleteChapter,
} = globalSlice.actions;

export default globalSlice.reducer;
