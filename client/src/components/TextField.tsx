import React from "react";

interface TextFieldProps {
	label: string;
	placeholder: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	className?: string;
}

const TextField = ({
	label,
	placeholder,
	type = "text",
	value,
	onChange,
	required = false,
	className = "",
}: TextFieldProps) => {
	return (
		<div className="flex flex-col gap-2 mb-1 py-2">
			<label htmlFor="text-field" className="text-md text-gray-700">
				{label}
			</label>
			<input
				required={required}
				value={value}
				onChange={onChange}
				className="p-2.5 rounded-xl bg-[#f3f5f7] border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TextField;
