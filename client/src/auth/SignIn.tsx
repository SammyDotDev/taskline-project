import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import { emailRegex } from "./SignUp";
import api from "../api/api";

const SignIn = () => {
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (userDetails.email.length > 0 && userDetails.password.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [userDetails]);

	const handleSignin = async () => {
		if (!emailRegex.test(userDetails.email)) {
			alert("Invalid email address");
			return;
		}
		try {
			const res = await api.post("/auth/signin", userDetails);
			console.log(res.data);
		} catch (e) {
			alert(e);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="w-full h-screen justify-center flex pt-52">
			<div className="flex flex-col gap-4 w-1/3 mx-auto">
				<h1 className="text-3xl font-bold font-stretch-75% my-6">
					Welcome Back!
				</h1>
				<TextField
					label="Email"
					placeholder="Enter your email"
					onChange={(e) =>
						setUserDetails((prev) => ({ ...prev, email: e.target.value }))
					}
					value={userDetails.email}
				/>
				<TextField
					type="password"
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
				<CustomButton
					title={loading ? "loading..." : "Sign In"}
					onClick={handleSignin}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default SignIn;
