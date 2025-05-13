import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import MainApp from "./main/MainApp";
import CreateProject from "./main/createProject/CreateProject";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { Provider } from "react-redux";
import store from "./store/store";
import AddTask from "./main/createProject/AddTask";
import ViewProject from "./main/viewProject/ViewProject";
import AddTaskToProject from "./main/viewProject/AddTaskViewProject";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/signin" Component={SignIn} />
					<Route path="/signup" Component={SignUp} />
				</Routes>
				<Routes>
					<Route path="/dashboard" Component={MainApp} />
					<Route path="/create-project" Component={CreateProject} />
					<Route path="/create-project/edit-project" Component={AddTask} />
					<Route path="/dashboard/view-project/:id" Component={ViewProject} />
					<Route path="/create-project/add-task" Component={AddTask} />
					<Route
						path="/dashboard/view-project/add-task"
						Component={AddTaskToProject}
					/>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
