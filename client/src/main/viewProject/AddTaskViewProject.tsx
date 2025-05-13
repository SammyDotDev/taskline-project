import React, { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import CustomButton from "../../components/CustomButton";
import SideBar from "../../sidebar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import api, { API_URL } from "../../api/api";
import { motion } from "framer-motion";

const AddTaskToViewProject = () => {
	const {
		state: { projectId, userId },
	} = useLocation();
	const navigate = useNavigate();
	const [disabled, setDisabled] = useState(false);
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const [task, setTask] = useState({
		title: "",
		projectId: 0,
		userId: 0,
		dueDate: "",
		status: null,
	});

	// const [projectId, setProjectId] = useState(0);
	// const [userId, setUserId] = useState(0);

	useEffect(() => {
		// const pId = localStorage.getItem("projectId");
		// const userId = localStorage.getItem("user");
		// const proId = pId ? +pId : 0;
		// const currentUserId = userId !== null && JSON.parse(userId).id;
		// setProjectId(proId);
		// console.log(proId, "PROJECT ID IN UE");
		// setUserId(currentUserId);
		setTask((prev) => ({
			...prev,
			projectId: projectId,
			userId: userId,
		}));
		console.log(projectId, userId);
	}, [projectId, userId]);

	const handleAddTaskToViewProject = async () => {
		console.log(task.projectId);
		try {
			const res = await api.post(`${API_URL}/task/add-task`, task, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.data.success) {
				setSuccess(res.data.message);
				setError("");
			}
			console.log(res.data);
		} catch (err) {
			setSuccess("");
			setError("Failed");
			console.log(err);
		} finally {
			setTimeout(() => {
				setError("");
				setSuccess("");
			}, 3000);
		}
	};
	return (
		<div className="w-full flex">
			<SideBar />
			<div className="w-10/12 h-screen -10/12 bg-gray-950 p-3.5 ml-auto">
				<div className="flex flex-col w-full gap-4">
					{error.length !== 0 && (
						<motion.div
							className="p-2.5 rounded-xl flex justify-center items-center bg-red-500 mx-auto absolute left-1/2"
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
					)}
					<h1 className="text-2xl font-bold text-gray-500">Add New Task</h1>
					<p className="text-base font-light text-gray-700">
						Create a new task for this project.
					</p>
				</div>
				<div className="w-full h-0.5 bg-gray-700 my-3.5" />
				<CustomButton
					backBtn
					onClick={() => {
						// const pId = localStorage.getItem("projectId");
						// const userId = localStorage.getItem("userId");
						// const projectId = pId ? +pId : 0;
						// const currentUserId = userId !== null && JSON.parse(userId).id;
						console.log(projectId, userId);

						navigate(`/dashboard/view-project/${projectId}`, {
							state: {
								userId: userId,
								projectId: projectId,
							},
						});
					}}
					title={<BiArrowBack />}
				/>
				<div className="flex flex-col gap-4 w-2/4 mx-auto">
					<TextField
						label="Task Title"
						placeholder="Enter task title"
						onChange={(e) =>
							setTask((prev) => ({ ...prev, title: e.target.value }))
						}
						value={task.title}
					/>
					<TextField
						label="Due date"
						type="date"
						placeholder="Enter project due date"
						onChange={(e) =>
							setTask((prev) => ({
								...prev,
								dueDate: e.target.value,
							}))
						}
						value={task.dueDate}
					/>
					<CustomButton
						title="Add New Task"
						onClick={handleAddTaskToViewProject}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	);
};

export default AddTaskToViewProject;
