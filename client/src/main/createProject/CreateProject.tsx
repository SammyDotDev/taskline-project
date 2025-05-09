import { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import SideBar from "../../sidebar/SideBar";
import CustomButton from "../../components/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import api, { API_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
	const navigate = useNavigate();
	const [projectData, setProjectData] = useState<{
		name: string;
		description: string;
	}>({
		name: "",
		description: "",
	});
	// const currentUserId = useSelector((state: RootState) => state.currentUser.id);

	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		const nameIsEmpty = projectData.name.length === 0;
		const descriptionIsEmpty = projectData.description.length === 0;

		if (nameIsEmpty && descriptionIsEmpty) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [projectData]);

	const handleCreateProject = async () => {
		const userId = localStorage.getItem("user");
		const currentUserId = userId !== null && JSON.parse(userId).id;
		try {
			const res = await api.post(
				`${API_URL}/project/add-project`,
				{
					name: projectData.name,
					description: projectData.description,
					userId: currentUserId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(res.data, res.status);
			if (res.status === 201) {
                localStorage.setItem("projectId", res.data.id)
                navigate("/create-project/add-task")
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="w-full flex">
			<SideBar />
			<div className="w-10/12 h-screen -10/12 bg-gray-950 p-3.5">
				<div className="flex flex-col w-full gap-4">
					<h1 className="text-2xl font-bold text-gray-500">
						Create New Project
					</h1>
					<p className="text-base font-light text-gray-700">
						Create new project to store tasks
					</p>
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
						onClick={handleCreateProject}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateProject;
