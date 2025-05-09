import React from "react";

const CustomButton = ({
	title,
	onClick,
	wFit = true,
	disabled = false,
	backBtn = false,
}: {
	title: string | React.ReactNode;
	onClick: () => void;
	wFit?: boolean;
	disabled?: boolean;
	backBtn?: boolean;
}) => {
	return (
		<button
			className={`rounded-xl px-4 py-3 ${
				backBtn ? "bg-[#3f3f406a]" : "bg-[#2d4acd]"
			} text-white ${
				wFit ? "w-fit" : ""
			} cursor-pointer hover:bg-[#2d4acd]/80 transition-colors duration-200 ease-in-out shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed ${
				backBtn ? "m-5" : ""
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{title}
		</button>
	);
};

export default CustomButton;
