import { useState } from "react";
import TextField from "../components/TextField";
import SideBar from "../sidebar/SideBar";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import api, { API_URL } from "../api/api";

const CreateProject = () => {
	const [projectData, setProjectData] = useState<{
		name: string;
		description: string;
	}>({
		name: "",
		description: "",
	});
	const currentUserId = useSelector((state: RootState) => state.currentUser.id);

    const handleCreateProject = async()=>{
        try{
            const res = await api.post(`${API_URL}/project/add-project`,{
                
            })
        }catch(err){

        }
    }

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
					<CustomButton title="Add Project" onClick={() => {}} />
				</div>
			</div>
		</div>
	);
};

export default CreateProject;
