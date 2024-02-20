function Message({message}) {
    let email = localStorage.getItem('email')
    
    const messageHTML = (message) => {
        if (message.username == email) {

            const content = message.kind === 'image' ? <img src={message.message} alt="" /> :  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white break-all"> {message.message}</span>
            
            return (
                <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-end">
                        <div className="flex flex-col gap-1 break-al">
                            <span className="text-gray-500">{message.username}</span>
                        
                            {content}
                        </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2"/>
                </div>
            )
        }
        const content = message.kind === 'image' ? <img src={message.message} alt="" /> : <span className="px-4 py-2 rounded-lg rounded-br-none bg-gray-300 text-black break-all">{message.message}</span>

        return (
            <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start">
                    <div className="flex flex-col gap-1 break-all">
                        {content}
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1"/>
            </div>
        )
    }


    return (
        <div className="chat-message">
            {messageHTML(message)}
        </div>
    )
}

export default Message;