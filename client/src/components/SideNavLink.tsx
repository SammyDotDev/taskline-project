import React from "react";
import { Link } from "react-router-dom";

const SideNavLink = ({
	children,
	to,
	icon,
	isActive = false,
}: {
	children: React.ReactNode;
	to: string;
	icon: React.ReactNode;
	isActive?: boolean;
}) => {
	return (
		<Link
			to={to}
			className={`py-2.5 px-3.5 rounded-xl my-3 ${
				isActive ? "bg-gray-700" : "bg-gray-900"
			} w-4/5 mx-auto text-[#9c9e9f] flex gap-4 items-center transition-colors duration-200 ease-in-out ${
				isActive ? "shadow-xl shadow-gray-900" : "shadow-none"
			}`}
		>
			{icon}
			{children}
		</Link>
	);
};

export default SideNavLink;
