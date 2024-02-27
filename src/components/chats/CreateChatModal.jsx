import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa6";
import {useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { addChat } from "../../redux/chatSlice";
import { fetcher } from "../../api/fetcher";
import { createChat } from "../../api/chats";
import ClickAwayListener from "react-click-away-listener";

export const CreateChatModal = ({open, setOpen}) => {
    const { user } = useAuth()
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!open) {
        return null
    }

    const handleNavigate = async(id) => {

        const resp = await fetcher(user.token, `chats/exists?first_user_id=${user.id}&second_user_id=${id}`)
        if (resp.status !== 200) {
            return
        }

        if (resp.data.exists) {
            setOpen(false)
            navigate(`/chats/${resp.data.chat_id}`)
            return
        }


        const respCreate = await createChat(user.token, user.id, id)
        if (respCreate.status !== 201) {
            return
        }

        dispatch(addChat(respCreate.data))
        setOpen(false)
        navigate(`/chats/${respCreate.data.id}`)
    }

    return (
        <div id="default-modal" tabIndex="-1" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full overlay">
            <ClickAwayListener onClickAway={()=> setOpen(false)}>
                <div className=" p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Start a new chat with a friend
                            </h3>
                            <button onClick={()=> setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className=" space-y-4">
                            <ul className=" divide-y divide-gray-200 ">
                                {users.map((u, index) => {
                                    if (u.id === user.id) {
                                        return null
                                    }

                                    return (
                                        <li className="py-2 px-5"  key={index} onClick={()=>handleNavigate(u.id)}>
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse  py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                                            <div className="flex-shrink-0">
                                                {u.picture !== "" ? <img className="w-8 h-8 rounded-full" src={u.picture} alt="Neil image"/> : ""}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {u.first_name} {u.last_name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {u.email}
                                                </p>
                                            </div>
                                            <FaArrowRight className="pr-3" color="blue" size="25" />
                                        </div>  
                                    </li>
                                    )

                                })}
                            </ul>

                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    )
}