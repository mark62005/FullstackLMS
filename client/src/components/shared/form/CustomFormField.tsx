import {
	ControllerRenderProps,
	FieldValues,
	useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Edit } from "lucide-react";

interface CustomFormFieldProps {
	name: string;
	label: string;
	type?:
		| "text"
		| "email"
		| "number"
		| "textarea"
		| "select"
		| "switch"
		| "password"
		| "file"
		| "multi-input";
	placeholder?: string;
	options?: { value: string; label: string }[];
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	value?: string;
	disabled?: boolean;
	isIcon?: boolean;
	initialValue?: string | number | boolean | string[];
}

function CustomFormField({
	name,
	label,
	type = "text",
	placeholder,
	options,
	className,
	labelClassName,
	inputClassName,
	disabled = false,
	isIcon = false,
	initialValue,
}: CustomFormFieldProps) {
	const { control } = useFormContext();

	function renderFormControl(
		field: ControllerRenderProps<FieldValues, string>
	) {
		switch (type) {
			/* TEXTAREA */
			case "textarea":
				return (
					<Textarea
						className={cn(
							`border-none bg-customgreys-darkGrey p-4`,
							inputClassName
						)}
						placeholder={placeholder}
						rows={3}
						{...field}
					/>
				);
			/* SELECT */
			case "select":
				return (
					<Select
						value={field.value || (initialValue as string)}
						defaultValue={field.value || (initialValue as string)}
						onValueChange={field.onChange}
					>
						<SelectTrigger
							className={cn(
								`w-full border-none bg-customgreys-primarybg p-4`,
								inputClassName
							)}
						>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>

						<SelectContent className="w-full bg-customgreys-primarybg border-customgreys-dirtyGrey shadow">
							{options?.map((option) => (
								<SelectItem
									className="cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey"
									key={option.value}
									value={option.value}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			/* SWITCH */
			case "switch":
				return (
					<div className="flex items-center space-x-2">
						<Switch
							id={name}
							checked={field.value}
							onCheckedChange={field.onChange}
							className={cn("text-customgreys-dirtyGrey", inputClassName)}
						/>
						<FormLabel
							className={labelClassName}
							htmlFor={name}
						>
							{label}
						</FormLabel>
					</div>
				);
			/* FILE */
			case "file":
				// TODO: Custom file field render
				break;
			/* NUMBER */
			case "number":
				return (
					<Input
						className={cn(
							`border-none bg-customgreys-darkGrey p-4`,
							inputClassName
						)}
						type="number"
						placeholder={placeholder}
						disabled={disabled}
						{...field}
					/>
				);
			/* MULTI-INPUT */
			case "multi-input":
				// TODO: Custom multi-input field render
				break;

			/* TEXT & EMAIL */
			default:
				return (
					<Input
						className={cn(
							`border-none bg-customgreys-primarybg p-4`,
							inputClassName
						)}
						type={type}
						placeholder={placeholder}
						disabled={disabled}
						{...field}
					/>
				);
		}
	}

	return (
		<FormField
			name={name}
			defaultValue={initialValue}
			control={control}
			render={({ field }) => (
				<FormItem
					className={cn(
						`relative`,
						className,
						type !== "switch" && "rounded-md"
					)}
				>
					{type !== "switch" && (
						<div className="flex justify-between items-center">
							<FormLabel
								className={cn(
									`text-customgreys-dirtyGrey text-sm`,
									labelClassName
								)}
							>
								{label}
							</FormLabel>

							{!disabled &&
								isIcon &&
								type !== "file" &&
								type !== "multi-input" && (
									<Edit className="size-4 text-customgreys-dirtyGrey" />
								)}
						</div>
					)}

					<FormControl>
						{renderFormControl({
							...field,
							value: field.value !== undefined ? field.value : initialValue,
						})}
					</FormControl>
					<FormMessage className="text-red-400" />
				</FormItem>
			)}
		/>
	);
}
export default CustomFormField;
