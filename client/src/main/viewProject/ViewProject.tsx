import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { BiArrowBack } from "react-icons/bi";
import SideBar from "../../sidebar/SideBar";

const ViewProject = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	console.log(id);
	return (
		<div className="w-full flex">
			<SideBar />
			<div className="w-10/12 h-screen -10/12 bg-gray-950 p-3.5 ml-auto">
				<div className="flex flex-col w-full gap-4">
					{/* {error.length !== 0 && (
						<motion.div
							className="p-2.5 rounded-xl flex justify-center items-center bg-red-500 mx-auto absolute"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
						>
							<p className="text-white">{error}</p>
						</motion.div>
					)}
					{success.length !== 0 && (
						<motion.div
							className="p-2.5 rounded-xl flex justify-center items-center bg-green-500 mx-auto absolute left-1/2"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
						>
							<p className="text-white">{success}</p>
						</motion.div>
					)} */}
					<h1 className="text-2xl font-bold text-gray-500">Projects: {}</h1>
					<p className="text-base font-light text-gray-700">
						Create a new task for this project.
					</p>
				</div>
				<div className="w-full h-0.5 bg-gray-700 my-3.5" />
				<CustomButton
					backBtn
					onClick={() => navigate("/create-project")}
					title={<BiArrowBack />}
				/>
				<div className="flex flex-col gap-4 w-2/4 mx-auto">
					{/* <CustomButton
						title="Add New Task"
						onClick={handleAddTask}
						disabled={disabled}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default ViewProject;
