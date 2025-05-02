import { useLocation } from "react-router-dom";
import SideNavLink from "../components/SideNavLink";
import { IoStatsChartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const SideBar = () => {
	const isActive = useLocation();
	const activePath = isActive.pathname;
	return (
		<div className="bg-[#f3f5f7] w-2/12 flex flex-col p-1.5 max-w-72">
			<div
				className={"py-4 px-3.5 rounded-xl my-3 bg-white w-4/5 mx-auto flex gap-4 items-center transition-colors duration-200 ease-in-out shadow-2xs"}
			>
                <p className="text-2xl ">TaskLine</p>
			</div>
			<SideNavLink
				to="/"
				icon={<IoStatsChartOutline size={20} />}
				isActive={activePath === "/"}
			>
				Dashboard
			</SideNavLink>
			<SideNavLink
				to="/create-project"
				icon={<FaPlus size={20} />}
				isActive={activePath === "/create-project"}
			>
				New Project
			</SideNavLink>
		</div>
	);
};

export default SideBar;
