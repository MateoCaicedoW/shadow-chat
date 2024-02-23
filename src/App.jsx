import { BrowserRouter, Routes, Route} from "react-router-dom";
import  Chat  from "./components/Chat";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthProvider";
import { WithoutUser } from "./components/auth/WithoutUser";

function App() {
    
    return (
        <main >
            <BrowserRouter>
                <AuthProvider> 
                    <Routes>
                        <Route path="/" element={
                            <WithoutUser>
                                <Login />
                            </WithoutUser>
                        } />
                        <Route path="/login" element={
                            <WithoutUser>
                                <Login />
                            </WithoutUser>
                        } />
                        <Route path="/sign-up" element={
                            <WithoutUser>
                                <SignUp />
                            </WithoutUser>
                        } />
                        <Route
                            path="/chat"
                            element={
                                <ProtectedRoute>
                                    <Chat />
                                </ProtectedRoute>
                            }
                        />
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
                </AuthProvider>
            </BrowserRouter>
        </main>
    );
}

export default App;