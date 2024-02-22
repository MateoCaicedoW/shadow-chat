import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { currentUser, login } from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthErrors, emptyAuthErrors } from "../../redux/authErrors";
import { setCurrentUser } from "../../redux/currentUserSlice"
import {Input}  from "../Input";

function Login(){
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(email)
        if (res.status !== 200) {
            dispatch(setAuthErrors(res.data))
            return
        }

        dispatch(setAuthErrors(emptyAuthErrors))
        sessionStorage.setItem(import.meta.env.VITE_SHADOW_SESSION, res.data.token)

        const resp = await currentUser(res.data.token)
        if (resp.status !== 200) {
            dispatch(setCurrentUser(null))
            return
        }

        dispatch(setCurrentUser(resp.data))
        navigate('/chat')
    }

    return (
        <div className="h-screen">
            <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                    Shadow    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" handleChange={e => setEmail(e.target.value)}   />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account?
                                <Link to="/sign-up" className="pl-2 font-medium text-blue-600 hover:underline dark:text-blue-500">Register here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            </section>

        </div>
    )
}

export default Login