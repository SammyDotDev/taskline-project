import { useState } from "react";
import TextField from "../components/TextField";
import SideBar from "../sidebar/SideBar";
import CustomButton from "../components/CustomButton";

const CreateProject = () => {
	const [projectName, setProjectName] = useState("");
	return (
		<div className="w-full flex">
			<SideBar />
			<div className="w-10/12 h-screen -10/12 bg-white p-3.5">
				<div className="flex flex-col w-full gap-4">
					<h1 className="text-2xl font-bold">Create New Project</h1>
					<p className="text-base font-light text-[#9c9e9f]">
						Create new project to store tasks
					</p>
				</div>
				<div className="w-full h-0.5 bg-gray-100 my-3.5" />
				<div className="flex flex-col gap-4 w-2/4 mx-auto">
					<TextField
						label="Project Name"
						placeholder="Enter project name"
						onChange={(e) => setProjectName(e.target.value)}
						value={projectName}
					/>
					<CustomButton title="Add Project" onClick={() => {}} />
				</div>
			</div>
		</div>
	);
};

export default CreateProject;
