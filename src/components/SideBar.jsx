import { useEffect, useState } from "react"
import { myChats } from "../api/users"
import { useAuth } from "./auth/AuthProvider"
import { IoIosMore } from "react-icons/io";
import ClickAwayListener from "react-click-away-listener";
import { CreateChatModal } from "./chats/CreateChatModal";
import { useInit } from "../hooks/useInit";
import { useDispatch, useSelector } from "react-redux";
import { getChats, addChat } from "../redux/chatSlice";
import { Link } from "react-router-dom";
import { webSocket } from "../hooks/websocket";

export const SideBar = ({children}) => {    
    const chats = useSelector(state => state.chats)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const { user, logout } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    webSocket()
    useInit();


    // console.log(ws);

     // Run when a new WebSocket message is received (lastJsonMessage)
    // useEffect(() => {
    //     if (lastJsonMessage) {
    //         let jsonString = JSON.stringify(lastJsonMessage)
    //         let resp = JSON.parse(jsonString)
    //         let chat = resp.chat
    //         if (chat.first_user_id !== user.id && chat.second_user_id !== user.id) {
    //             return
    //         }

    //         dispatch(addChat(chat))
    //     }
    // }, [lastJsonMessage])

    useEffect(() => {
        const loadChats = async () => {
            const resp = await myChats(user.token, user.id)
            if (resp.status !== 200) {
                return
            }
            
            dispatch(getChats(resp.data)) 
        }
        loadChats()
    }, [])

    const handleDropdown = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
        logout()
    }

    const isOpen = open ? "block" : "hidden"
    return (
        <div className="flex">

            <div className="w-1/4 bg-white border-r border-gray-300">
                <CreateChatModal open={openModal} setOpen={setOpenModal} />
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-blue-500 text-white">
                    <h1 className="text-2xl font-semibold text-white">Chats</h1>
                    <ClickAwayListener onClickAway={()=> setOpen(false)}>
                        <div className="relative">
                            <button id="menuButton" className="focus:outline-none" onClick={handleDropdown}>
                                <IoIosMore size="25" />
                            </button>
                            
                            <div id="menuDropdown" className={"absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg "+ isOpen}>
                                <ul className="py-2 px-3">
                                    <li>
                                        <button onClick={()=> setOpenModal(true)} className="block px-4 py-2 text-gray-800 hover:text-gray-400">
                                            Create Chat
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:text-gray-400">
                                            Log out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ClickAwayListener>
                </header>
            
            
                <div className="overflow-y-auto p-3" style={{maxHeight: "calc(100vh - 66px)"}}>
                    {
                        chats.map((chat, index) => {
                            return (
                                <Link to={"/chats/"+chat.id} key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                        <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full"/>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold">
                                            {
                                                chat.first_user_id === user.id ? chat.second_user_name : chat.first_user_name
                                            }
                                        </h2>
                                        <p className="text-gray-600">{chat.last_message}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}