import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { BiArrowBack } from "react-icons/bi";
import SideBar from "../../sidebar/SideBar";
import api, { API_URL } from "../../api/api";
import { formatDate } from "../../helpers/formatDate";
import TextField from "../../components/TextField";

const ViewProject = () => {
	const {
		state: { projectId, userId },
	} = useLocation();
	const [isEditProject, setIsEditProject] = useState<boolean>(false);
	const [newProjectName, setNewProjectName] = useState<string>("");
	const [projectData, setProjectData] = useState({
		project: {
			id: null,
			name: "",
			description: "",
		},
		task: [
			{
				title: "",
				dueDate: "",
			},
		],
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
	}, [projectId, userId]);

	useEffect(() => {
		console.log(projectData);
	}, [projectData]);

	const handleEditProjectName = async () => {
		setLoading(true);
		setIsEditProject((prev) => !prev);
		if (isEditProject) {
			try {
				const res = await api.patch(
					`${API_URL}/project/update-project-name/${userId}/${projectId}`,

					{ name: newProjectName },

					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				console.log(res.data);
				setProjectData((prev) => ({
					...prev,
					project: res.data,
				}));
			} catch (err) {
				console.log(err);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 3000);
			}
		}
	};
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
				<div className="flex justify-between w-full">
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
					<div className="">
						<div className="flex items-center gap-5 h-14">
							<h1 className="text-2xl font-bold text-gray-500 flex gap-1.5">
								Project Title:{" "}
							</h1>
							{isEditProject ? (
								<TextField
									noLabel
									placeholder="Edit project name"
									onChange={(e) => setNewProjectName(e.target.value)}
									value={newProjectName}
								/>
							) : (
								<p className="text-white">{projectData.project?.name}</p>
							)}
						</div>
						<p className="text-base font-light text-gray-500">
							Create a new task for this project.
						</p>
					</div>
					<CustomButton
						backBtn
						title={isEditProject ? "Done" : "Edit project name"}
						onClick={handleEditProjectName}
					/>
				</div>
				<div className="w-full h-0.5 bg-gray-700 my-3.5" />
				<div className="flex justify-between items-center py-2">
					<CustomButton
						backBtn
						onClick={() => navigate("/")}
						title={<BiArrowBack />}
					/>
					<CustomButton
						onClick={() =>
							navigate("/dashboard/view-project/add-task", {
								state: { projectId, userId },
							})
						}
						title={"Add New Task"}
					/>
				</div>
				<div className="flex flex-col gap-4 w-full">
					<h1 className="text-2xl font-bold text-gray-500 flex gap-1.5">
						Tasks
					</h1>
					<div className="w-full rounded-3xl p-2 gap-4 bg-gray-900">
						{projectData.task.length === 0 ? (
							<div className="my-7">
								<p className="text-white font-bold text-center">
									No task added
								</p>
							</div>
						) : (
							projectData.task?.map((item) => {
								const dueDate = new Date(item.dueDate);

								return (
									<div className="w-full rounded-2xl bg-gray-700 p-2.5 py-5 flex gap-2 my-1">
										<p className="text-white">{item.title}</p>
										<p className="text-white">{formatDate(item.dueDate)}</p>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewProject;
