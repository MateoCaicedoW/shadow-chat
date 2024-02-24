import Chat from "./Chat"
import { SideBar } from "./SideBar"

export const Home = () => {
    return (
        <div className="flex">
            <SideBar />
            <Chat />
        </div>
    )
}