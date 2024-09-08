import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Agri2, Facebooklogo, Googlelogo } from "../../assets/images";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Client"); // New state for role selection
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrConfirmPassword("");
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value); // Capture selected role
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Create a password");
    }

    if (password !== confirmPassword) {
      setErrConfirmPassword("Passwords do not match");
    }

    if (email && password && password === confirmPassword) {
      setSuccessMsg(
        `Hello ${role}, thank you for signing up! We are processing your information. A confirmation email will be sent to ${email}.`
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("Client"); // Reset role to default after successful signup
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100 font-sans">
      <div className="w-4/5 md:w-3/5 lg:w-2/3 bg-white flex rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-[#088d34] text-white flex flex-col items-center p-5 relative">
          <img src={Agri2} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-center items-center p-5">
          <div className="w-full max-w-sm">
            {successMsg ? (
              <div className="w-full flex flex-col justify-center">
                <p className="w-full px-4 py-10 text-green-500 font-medium">
                  {successMsg}
                </p>
                <Link to="/login">
                  <button
                    className="w-full h-10 bg-[#088d34] text-gray-200 rounded-md text-base font-semibold 
                    tracking-wide hover:bg-black hover:text-white duration-300"
                  >
                    Go to Login
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl mb-5">Sign Up for AgroVista</h2>
                <p className="text-base mb-4 text-gray-500">Create your account to get started !!</p>
                
                <div className="flex flex-col space-y-3 mb-5">
                  <button className="bg-white border border-gray-300 py-1.5 px-1 flex items-center justify-center rounded-md shadow-lg">
                    <img src={Googlelogo} alt="Google" className="w-5 mr-2" />
                    Sign Up with Google
                  </button>
                  <button className="bg-white border border-gray-300 py-1.5 px-4 flex items-center justify-center rounded-md shadow-lg">
                    <img src={Facebooklogo} alt="Facebook" className="w-5 mr-2" />
                    Sign Up with Facebook
                  </button>
                </div>
                <div className="flex items-center mb-5">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-3 text-gray-400">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <form className="flex flex-col space-y-2" onSubmit={handleSignUp}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  {errConfirmPassword && (
                    <p className="text-sm text-red-500">
                      <span className="font-bold italic mr-1">!</span>
                      {errConfirmPassword}
                    </p>
                  )}

                  {/* Role Selection Dropdown */}
                  <select
                    value={role}
                    onChange={handleRoleChange}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Client">Client</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Driver">Driver</option>
                    <option value="Consultant">Consultant</option>
                  </select>

                  <button
                    type="submit"
                    className="p-3 bg-[#088d34] text-white rounded-md"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="text-center mt-5">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-[#088d34]">Sign In</Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
