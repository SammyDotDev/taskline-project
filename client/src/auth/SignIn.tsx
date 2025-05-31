import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { emailRegex } from "./SignUp";
import api from "../api/api";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

const SignIn = () => {
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const [userDetails, setUserDetails] = useState({
		username: "",
		password: "",
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (userDetails.username.length > 0 && userDetails.password.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [userDetails]);

	const handleSignin = async () => {
		// if (!emailRegex.test(userDetails.username)) {
		// 	alert("Invalid email address");
		// 	return;
		// }
		try {
			const res = await api.post("/auth/signin", userDetails);
			console.log(res.data.message);
			if (res.status === 200 && res.data.success) {
				localStorage.setItem("user", JSON.stringify(res.data.user));

				setSuccess(res.data.message);
				setError("");
				navigate("/");
			}
		} catch (e) {
			// console.log(e.response.data.error)
			// setError(e.response.data.message);
            setError("Failed to sign in.");
            console.log(e);
			setSuccess("");
		} finally {
			setLoading(false);
			setTimeout(() => {
				setError("");
				setSuccess("");
			}, 3000);
		}
	};
	return (
		<div className="w-full h-screen justify-center flex flex-col pt-52 bg-gray-950">
			{error.length !== 0 && (
				<motion.div
					className="p-2.5 rounded-xl flex justify-center items-center bg-red-500 mx-auto  absolute left-1/2 top-3.5"
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
				>
					<p className="text-white">{error}</p>
				</motion.div>
			)}
			{success.length !== 0 && (
				<motion.div
					className="p-2.5 rounded-xl flex justify-center items-center bg-green-500 mx-auto absolute left-1/2 top-3.5"
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
				>
					<p className="text-white">{success}</p>
				</motion.div>
			)}
			<div className="flex flex-col gap-4 w-1/3 mx-auto">
				<h1 className="text-3xl font-bold font-stretch-75% my-6">
					Welcome Back!
				</h1>
				<TextField
					label="Username"
					placeholder="Enter your username"
					onChange={(e) =>
						setUserDetails((prev) => ({ ...prev, username: e.target.value }))
					}
					value={userDetails.username}
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
				<p className="text-white">
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
