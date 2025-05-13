import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import api from "../api/api";
import { motion } from "framer-motion";

export const emailRegex = RegExp(
	"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
);
const SignUp = () => {
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const [userDetails, setUserDetails] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		if (
			userDetails.username.length > 0 &&
			userDetails.password.length > 0 &&
			confirmPassword.length > 0
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [userDetails, confirmPassword]);

	const handleSignUp = async () => {
		setLoading(true);
		if (userDetails.password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		if (!emailRegex.test(userDetails.email)) {
			alert("Invalid email address");
			return;
		}
		try {
			const res = await api.post("/auth/signup", userDetails);
			console.log(res.data, res.status);
			if (res.status === 201) {
				setSuccess("Account Created");
				setError("");
			}
		} catch (e) {
			setError(e.response.data.message);
			setSuccess("");
		} finally {
			setLoading(false);
			setTimeout(() => {
				setError("");
				setSuccess("");
			}, 3000);
		}
		setLoading(false);
	};
	return (
		<div className="w-full h-screen flex flex-col justify-center pt-52 bg-gray-950">
			{error.length !== 0 && (
				<motion.div
					className="p-2.5 rounded-xl flex justify-center items-center bg-red-500 mx-auto"
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
				>
					<p className="text-white">{error}</p>
				</motion.div>
			)}
			{success.length !== 0 && (
				<motion.div
					className="p-2.5 rounded-xl flex justify-center items-center bg-green-500 mx-auto"
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
				>
					<p className="text-white">{success}</p>
				</motion.div>
			)}
			<div className="flex flex-col gap-4 w-1/3 mx-auto">
				<h1 className="text-3xl font-bold font-stretch-75% my-6">
					Create your account
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
					label="Email"
					placeholder="Enter your email address"
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
				<TextField
					type="password"
					label="Confirm Password"
					placeholder="Confirm your password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword}
				/>
				<p className="text-white">
					Already have an account?
					<Link to="/signin" className="text-blue-500 ml-1.5">
						Sign in
					</Link>
				</p>
				<CustomButton
					title={loading ? "loading..." : "Sign Up"}
					onClick={handleSignUp}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default SignUp;
