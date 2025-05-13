import { useLocation, useNavigate } from "react-router-dom";
import SideNavLink from "../components/SideNavLink";
import { IoStatsChartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import CustomButton from "../components/CustomButton";

const SideBar = () => {
	const navigate = useNavigate();
	const isActive = useLocation();
	const activePath = isActive.pathname;

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("projectId");
		navigate("/signin", {
			replace: true,
		});
	};
	return (
		<div className="bg-gray-900 w-2/12 flex flex-col p-1.5 max-w-96 fixed h-full">
			<div
				className={
					"py-4 px-3.5 rounded-xl my-3 bg-gray-700 w-4/5 mx-auto flex gap-4 items-center transition-colors duration-200 ease-in-out shadow-2xs"
				}
			>
				<p
					className="text-2xl font-black text-shadow-white"
					style={{ color: "white" }}
				>
					TaskLine
				</p>
			</div>
			<SideNavLink
				to="/"
				icon={<IoStatsChartOutline size={20} />}
				isActive={activePath.includes("/dashboard")}
			>
				Dashboard
			</SideNavLink>
			<SideNavLink
				to="/create-project"
				icon={<FaPlus size={20} />}
				isActive={activePath.includes("/create-project")}
			>
				New Project
			</SideNavLink>
			<CustomButton
				className={"bg-transparent"}
				backBtn
				logout
				wFit={false}
				onClick={handleLogout}
				title={
					<div className="flex items-center gap-3">
						<BiLogOut size={20} color={"red"} />
						<p className="text-red-600 font-semibold">Sign Out</p>
					</div>
				}
				// isActive={activePath === "/create-project"}
			/>
		</div>
	);
};

export default SideBar;
