import { useEffect, useState } from "react"
import { myChats } from "../api/users"
import { useAuth } from "./auth/AuthProvider"
import { IoIosMore } from "react-icons/io";
import ClickAwayListener from "react-click-away-listener";
import { CreateChatModal } from "./chats/CreateChatModal";
import { useInit } from "../hooks/useInit";

export const SideBar = ({children}) => {    
    const [chats, setChats] = useState([])
    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    useInit();

    useEffect(() => {
        const getChats = async () => {
            const resp = await myChats(user.token, user.id)
            if (resp.status !== 200) {
                return
            }
            setChats(resp.data)
        }
        getChats()
    }, [])

    const handleDropdown = () => {
        setOpen(!open)
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
                                </ul>
                            </div>
                        </div>
                    </ClickAwayListener>
                </header>
            
            
                <div className="overflow-y-auto p-3" style={{maxHeight: "calc(100vh - 66px)"}}>
                    {
                        chats.map(chat => {
                            return (
                                <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                        <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full"/>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold"></h2>
                                        <p className="text-gray-600">Hoorayy!!</p>
                                    </div>
                                </div>
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