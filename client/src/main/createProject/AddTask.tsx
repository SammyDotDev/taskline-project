import React, { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import CustomButton from "../../components/CustomButton";
import SideBar from "../../sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import api, { API_URL } from "../../api/api";

const AddTask = () => {
	const navigate = useNavigate();
	const [disabled, setDisabled] = useState(false);
	const [task, setTask] = useState({
		title: "",
		projectId: 0,
		dueDate: "",
		status: null,
	});

	useEffect(() => {
		const pId = localStorage.getItem("projectId");
		const projectId = pId ? +pId : 0;
		setTask((prev) => ({
			...prev,
			projectId: projectId,
		}));
	}, []);

	const handleAddTask = async () => {
		console.log(task);
		try {
			const res = await api.post(`${API_URL}/task/add-task`, task, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="w-full flex">
			<SideBar />
			<div className="w-10/12 h-screen -10/12 bg-gray-950 p-3.5">
				<div className="flex flex-col w-full gap-4">
					<h1 className="text-2xl font-bold text-gray-500">Add New Task</h1>
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
						onClick={handleAddTask}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	);
};

export default AddTask;
