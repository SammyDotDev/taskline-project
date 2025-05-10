import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainApp from "./main/MainApp";
import CreateProject from "./main/createProject/CreateProject";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { Provider } from "react-redux";
import store from "./store/store";
import AddTask from "./main/createProject/AddTask";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/signin" Component={SignIn} />
					<Route path="/signup" Component={SignUp} />
				</Routes>
				<Routes>
					<Route path="/" Component={MainApp} />
					<Route path="/create-project" Component={CreateProject} />
					<Route path="/create-project/edit-project" Component={AddTask} />
					<Route path="/create-project/view-project" Component={AddTask} />
					<Route path="/create-project/add-task" Component={AddTask} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
