const CustomButton = ({
	title,
	onClick,
	wFit = true,
    disabled = false,
}: {
	title: string;
	onClick: () => void;
	wFit?: boolean;
    disabled?:boolean;
}) => {
	return (
		<button
			className={`rounded-xl px-4 py-3 bg-[#2d4acd] text-white ${
				wFit ? "w-fit" : ""
			} cursor-pointer hover:bg-[#2d4acd]/80 transition-colors duration-200 ease-in-out shadow-2xs`}
			onClick={onClick}
            disabled={disabled}
		>
			{title}
		</button>
	);
};

export default CustomButton;
