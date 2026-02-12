import React, { useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../content/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter the password");
      return;
    }

    if (!password) {
      setError("Please Enter the password");
      return;
    }

    setError("");

    //SignUp API Call
    try {

      //Upload image if present
      if(profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong . Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

          <div className="md:w-3/4">
            <h3 className='text-2xl font-semibold text-black'>Create an Account</h3>
            <p className='text-lg text-slate-700 mt-[5px] mb-6'>
              Join us today by entering your details below.
            </p>
          </div>

          <div className="md:w-1/4 flex justify-center md:justify-end">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>
        </div>






        <form onSubmit={handleSignUp}>
          {/* <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Khushi Rathore"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="abc@example.com"
              type="text"
            />
            <div className='col-span-2'></div>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 6 characters"
              type="password"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className='btn-primary'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{""}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout >
  )
}
export default SignUp