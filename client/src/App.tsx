import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainApp from "./main/MainApp";
import CreateProject from "./main/CreateProject";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/signin" Component={SignIn} />
				<Route path="/signup" Component={SignUp} />
			</Routes>
			<Routes>
				<Route path="/" Component={MainApp} />
				<Route path="/create-project" Component={CreateProject} />
			</Routes>
		</Router>
	);
}

export default App;
