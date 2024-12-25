import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type ToolbarProps = {
	onSearch: (searchTerm: string) => void;
	onCategoryChange: (category: string) => void;
};

const COURSE_CATEGORIES = [
	{ value: "all", label: "All Categories" },
	{ value: "technology", label: "Technology" },
	{ value: "science", label: "Science" },
	{ value: "mathematics", label: "Mathematics" },
	{ value: "artificial-intelligence", label: "Artificial Intelligence" },
] as const;

function Toolbar({ onSearch, onCategoryChange }: ToolbarProps) {
	const [searchTerm, setSearchTerm] = useState("");

	function handleSearch(value: string) {
		setSearchTerm(value);
		onSearch(value);
	}

	return (
		<div className="w-full flex items-center justify-between gap-4 mb-4">
			<Input
				className="
          w-full px-5 h-12 border-none rounded-md 
          bg-customgreys-primarybg placeholder-customgreys-dirtyGrey text-customgreys-dirtyGrey
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        "
				type="text"
				value={searchTerm}
				placeholder="Search courses"
				onChange={(e) => handleSearch(e.target.value.trim())}
			/>

			<Select onValueChange={onCategoryChange}>
				<SelectTrigger className="h-12 w-[180px] bg-customgreys-primarybg text-customgreys-dirtyGrey border-none">
					<SelectValue placeholder="Categories" />
				</SelectTrigger>

				<SelectContent className="bg-customgreys-primarybg hover:bg-customgreys-primarybg/90">
					{COURSE_CATEGORIES.map((category) => (
						<SelectItem
							key={category.value}
							className="cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey"
							value={category.value}
						>
							{category.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
export default Toolbar;
