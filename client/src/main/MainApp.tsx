import React, { useEffect } from "react";
import SideBar from "../sidebar/SideBar";
import api, { API_URL } from "../api/api";

const MainApp = () => {
	const getUserProjects = async () => {
		const userId = localStorage.getItem("user");
		const currentUserId = userId !== null && JSON.parse(userId).id;
		try {
			const res = await api.get(
				`${API_URL}/project/get-projects/${currentUserId}`
			);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUserProjects();
	}, []);
	return (
		<div className="w-full flex h-screen">
			<SideBar />
			<div className="w-10/12 bg-gray-950 p-3.5">
				<p>Welcome to the Main App</p>
			</div>
		</div>
	);
};

export default MainApp;
