import React from "react";
import SideBar from "../sidebar/SideBar";

const MainApp = () => {
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
