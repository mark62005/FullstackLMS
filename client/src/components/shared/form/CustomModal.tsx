import { ReactNode } from "react";

type CustomModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

function CustomModal({ isOpen, onClose, children }: CustomModalProps) {
	if (!isOpen) return null;

	return (
		<>
			{/* OVERLAY */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 z-40"
				onClick={onClose}
			/>
			{/* CONTENT */}
			<div
				className="
        fixed inset-y-0 right-0 z-50 overflow-y-auto
        w-full max-w-md bg-customgreys-secondarybg shadow-lg
        "
			>
				<div className="p-6">{children}</div>
			</div>
		</>
	);
}
export default CustomModal;
