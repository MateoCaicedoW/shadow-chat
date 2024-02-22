import { BrowserRouter, Routes, Route} from "react-router-dom";
import  Chat  from "./Chat";
import  Login from "./auth/Login";
import SignUp from "./auth/SignUp";

function App() {
    return (
        <main >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="*" element={
                    <section className="bg-white dark:bg-gray-900 ">
                        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                            <div>
                                <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
                                <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We can’t find that page</h1>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn't exist or has been moved.</p>

                                <div className="flex items-center mt-6 gap-x-3">
                                </div>
                            </div>
                        </div>
                    </section>} />
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;