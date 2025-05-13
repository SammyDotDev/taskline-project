import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { BiArrowBack } from "react-icons/bi";
import SideBar from "../../sidebar/SideBar";
import api, { API_URL } from "../../api/api";

const ViewProject = () => {
	const {
		state: { projectId, userId },
	} = useLocation();
	const [projectData, setProjectData] = useState({
		project: {},
		task: {},
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		console.log(userId, projectId, "ID'S");
		const fetchData = async () => {
			setLoading(true);
			try {
				const projectResponse = await api.get(
					`${API_URL}/project/get-project/${userId}/${projectId}`
				);
				const taskResponse = await api.get(
					`${API_URL}/task/get-tasks/${projectId}`
				);
				setProjectData((prev) => ({
					...prev,
					project: projectResponse.data,
					task: taskResponse.data,
				}));
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	return (
		<div className="w-full flex relative">
			{loading && (
				<div className="absolute w-full h-full bg-[#17171b7f] z-[999999] flex justify-center items-center">
					<div className="w-fit">
						<p className="text-2xl text-white font-bold">Loading....</p>
					</div>
				</div>
			)}
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
					onClick={() => navigate("/")}
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
