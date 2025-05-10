import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import TextField from "../../components/TextField";
import SideBar from "../../sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import api, { API_URL } from "../../api/api";

const EditProject = () => {
	const navigate = useNavigate();
	const [projectData, setProjectData] = useState<{
		name: string;
		description: string;
	}>({
		name: "",
		description: "",
	});
	const [disabled, setDisabled] = useState(true);

	const getProjects = async () => {
		const userId = localStorage.getItem("user");
		const currentUserId = userId !== null && JSON.parse(userId).id;
		try {
			const res = await api.get(`${API_URL}/get-projects/${currentUserId}`);
			setProjectData(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {}, []);

	const handleEditProject = async () => {};
	return (
		<div className="w-full flex bg-gray-950">
			<SideBar />
			<div className="w-10/12 h-screen -10/12 p-3.5 ml-auto">
				<div className="flex flex-col w-full gap-4">
					<h1 className="text-2xl font-bold text-gray-500">Edit Project</h1>
				</div>
				<div className="w-full h-0.5 bg-gray-700 my-3.5" />
				<div className="flex flex-col gap-4 w-2/4 mx-auto">
					<TextField
						label="Project Name"
						placeholder="Enter project name"
						onChange={(e) =>
							setProjectData((prev) => ({ ...prev, name: e.target.value }))
						}
						value={projectData.name}
					/>
					<TextField
						label="Project Description"
						placeholder="Enter project description"
						onChange={(e) =>
							setProjectData((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
						value={projectData.description}
					/>
					<CustomButton
						title="Add Project"
						onClick={handleEditProject}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditProject;
