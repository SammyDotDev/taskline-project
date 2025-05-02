import { useState } from "react";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";

const SignIn = () => {
	const [userDetails, setUserDetails] = useState({
		username: "",
		password: "",
	});
	return (
		<div className="w-full h-screen justify-center flex pt-52">
			<div className="flex flex-col gap-4 w-1/3 mx-auto">
				<h1 className="text-3xl font-bold font-stretch-75% my-6">Welcome Back!</h1>
				<TextField
					label="Username"
					placeholder="Enter your username"
					onChange={(e) =>
						setUserDetails((prev) => ({ ...prev, username: e.target.value }))
					}
					value={userDetails.username}
				/>
				<TextField
					label="Password"
					placeholder="Enter your password"
					onChange={(e) =>
						setUserDetails((prev) => ({ ...prev, password: e.target.value }))
					}
					value={userDetails.password}
				/>
				<p>
					Don't have an account?
					<Link to="/signup" className="text-blue-500 ml-1.5">
						Sign Up
					</Link>
				</p>
				<CustomButton title="Sign In" onClick={() => {}} />
			</div>
		</div>
	);
};

export default SignIn;
