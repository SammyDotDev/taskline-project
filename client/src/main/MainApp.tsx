import React, {
	ButtonHTMLAttributes,
	useEffect,
	useRef,
	useState,
} from "react";
import SideBar from "../sidebar/SideBar";
import api, { API_URL } from "../api/api";
import { FaEllipsis } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MainApp = () => {
	const navigate = useNavigate();
	const [projects, setProjects] = useState([]);
	const ellipseButton = useRef<ButtonHTMLAttributes<React.ReactNode>>(null);
	const [selectedTaskEllipse, setSelectedTaskEllipse] = useState(null);
	const [ellipseIsSelected, setEllipseIsSelected] = useState(false);
	const [el, setEl] = useState(true);
	const getUserProjects = async () => {
		const userId = localStorage.getItem("user");
		const currentUserId = userId !== null && JSON.parse(userId).id;
		try {
			const res = await api.get(
				`${API_URL}/project/get-projects/${currentUserId}`
			);
			console.log(res.data);
			setProjects(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteProject = async (projectId: number) => {
		try {
			const res = await api.delete(
				`${API_URL}/project/delete-project/${projectId}`
			);
			if (res.status === 200) {
				getUserProjects();
				console.log("Project deleted successfully");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleViewProject = (id: number) => {
		const userId = localStorage.getItem("user");
		const currentUserId = userId !== null && JSON.parse(userId).id;
		console.log(id);
		// setEl(false);
		// if (ellipseButton.current && ellipseButton.current.accessKey === "0") {
		// setSelectedTaskEllipse(item.id);
		navigate(`/view-project/${id}`, {
			state: {
				userId: currentUserId,
				projectId: id,
			},
		});
		// }
	};

	useEffect(() => {
		getUserProjects();
	}, []);
	return (
		<div
			className="w-full flex h-full bg-gray-950"
			onClick={() => {
				// setEl(false);
				// if (ellipseButton.current?.accessKey === "0") {
				setSelectedTaskEllipse(null);
				// setEl(true);
				// }
				console.log(ellipseButton.current?.accessKey);
			}}
		>
			<SideBar />
			<div className="w-10/12 p-3.5 ml-auto bg-gray-950 h-screen">
				<div className="flex flex-col w-full gap-4 mt-7">
					<h1 className="text-2xl font-bold text-gray-500">View Projects</h1>
				</div>
				<div className="w-full h-0.5 bg-gray-700 my-7" />
				<div className="flex flex-wrap overflow-scroll gap-4">
					{projects.length > 0 ? (
						projects.map((item) => {
							// console.log(item);
							return (
								<div
									key={item.id}
									className="w-4/12 relative"
									onClick={() => handleViewProject(item.id)}
								>
									<div className="bg-gray-800 border-4 border-gray-800 rounded-2xl w-full min-h-48 p-5 flex flex-col justify-between hover:bg-gray-950 hover:border-gray-400 transition-all duration-200 ease-in-out">
										<h3 className="text-3xl text-gray-400 font-bold">
											{item.name}
										</h3>
										<div className="flex justify-between">
											<p className="text-gray-400 text-base font-medium w-3/4">
												{item.description}
											</p>
											<button
												ref={ellipseButton}
												accessKey={el ? "1" : "0"}
												className="rounded-xl p-2 flex justify-center items-center hover:bg-gray-700 transition ease-in-out cursor-pointer"
												onClick={(e) => {
													e.stopPropagation();
													// setEl(true);
													// if (
													// ellipseButton.current &&
													// // ellipseButton.current.accessKey === "1"
													// ) {
													setSelectedTaskEllipse(item.id);
													// }
												}}
											>
												<FaEllipsis color="white" size={20} />
											</button>
										</div>
									</div>
									{selectedTaskEllipse === item.id && (
										<motion.div
											onBlur={() => setSelectedTaskEllipse(null)}
											// onClick={() => {
											// 	if (el) {
											// 	}
											// }}
											className="absolute bottom-5 right-3 bg-gray-900 p-1.5 rounded-xl"
											initial={{
												scale: 0,
											}}
											animate={{
												scale: 1,
											}}
											exit={{ scale: 0 }}
										>
											<p
												className="text-red-400 text-base font-medium hover:bg-gray-600 transition ease-in-out rounded-lg p-0.5 cursor-pointer"
												onClick={() => handleDeleteProject(item.id)}
											>
												delete
											</p>
											<p className="text-gray-400 text-base font-medium hover:bg-gray-600 transition ease-in-out rounded-lg p-0.5 cursor-pointer">
												edit
											</p>
										</motion.div>
									)}
								</div>
							);
						})
					) : (
						<div>
							<p>No Projects</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MainApp;
