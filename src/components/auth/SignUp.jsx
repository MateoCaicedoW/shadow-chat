import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { Input } from "../Input";
import { useDispatch } from "react-redux";
import { setAuthErrors, emptyAuthErrors } from "../../redux/authErrors";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
function SignUp(){
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setAuthErrors(emptyAuthErrors))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await register(email, firstName, lastName)
        if (res.status !== 201) {
            dispatch(setAuthErrors(res.data))
            return
        }

        dispatch(setAuthErrors(emptyAuthErrors))
        setEmail("")
        setFirstName("")
        setLastName("")
        navigate('/login')
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                    Shadow    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email} handleChange={(e) => setEmail(e.target.value)}  />

                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <Input type="text" name="first_name" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" value={firstName} handleChange={(e) => setFirstName(e.target.value)}  />

                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <Input type="text" name="last_name" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" value={lastName} handleChange={(e) => setLastName(e.target.value)}  />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? 
                                <Link to="/login" className="pl-2 font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp