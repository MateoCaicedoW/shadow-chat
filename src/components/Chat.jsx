import { useEffect, useState, useRef } from 'react'
import useWebSocket from "react-use-websocket"
import Message from './Message'
import SendNotification from '../../utils/send_notification';
import { IoArrowDown } from "react-icons/io5";
import InputChat from './InputChat';
import { useAuth } from './auth/AuthProvider';
import { sendMessage } from '../api/messages';
import { fetcher } from '../api/fetcher';
import { useNavigate, useParams } from 'react-router-dom';
import { getMessagesFrom } from '../api/chats';

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [empty, setEmpty] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const { user } = useAuth()
  const inputChat = useRef(null)
  const params = useParams()
  const navigate = useNavigate()

  const existsChat = async () => {
    const resp = await fetcher(user.token, `chats/${params.id}/exists_by_user_id`)

    if (resp.status !== 200 || !resp.data) {
      navigate('/chats')
      return
    }

    const respMessages = await getMessagesFrom(user.token, params.id)
    if (respMessages.status !== 200) {
      return
    }

    setMessages(respMessages.data)
  }
  
  useEffect(() => {
    existsChat()
  }, [params.id])

  const WS_URL = `${import.meta.env.VITE_API_WEBSOCKET_URL}/ws/${params.id}`
  const { lastJsonMessage } = useWebSocket(
    WS_URL,
    {
      queryParams: {
        Authorization: `Bearer ${user.token}`
      },
      shouldReconnect: () => true,
    },
  )
  
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  const handleOnChange = (e) => {
    setEmpty(false)
    setMessage(e.target.value)
  }

  const addMessage = async (e) => {
    e.preventDefault()

    if (message.trim() === '') {
      setEmpty(true)
      return
    }

    const messageInfo = {
      content: message,
      user_id: user.id,
      user_first_name: user.first_name,
      user_last_name: user.last_name,
      user_email: user.email,
      kind : "text",
      user_picture: user.picture,
      element_id: params.id
    }

    const resp = await sendMessage(user.token, params.id, messageInfo)
    if (resp.status !== 200) {
      return
    }


    setMessage('')
    setEmpty(false)
    inputChat.current.focus()
  }

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    if (lastJsonMessage) {
      setMessages(messages => [...messages, lastJsonMessage])

      let jsonString = JSON.stringify(lastJsonMessage)
      let message = JSON.parse(jsonString)

      if (message.user_email === user.email) {
        return
      }

      SendNotification(message)
    }
  }, [lastJsonMessage])


  useEffect(() => {
    let lenMessages = messages.length
    if (lenMessages === 0) {
      return
    }

    let lastMessage = messages[lenMessages - 1]
    if (lastMessage.user_email === user.email) {
      setShowButton(false)
      scrollToBottom()
    }

    if (!showButton) {
      scrollToBottom()
    }

  }, [messages])


  const handleScroll = (e) => {
    // know if the user is in the bottom of the screen
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      setShowButton(false)
      return
    }

    setShowButton(true)
  }

  const handleInputFile = (e) => {
    let file = e.target.files[0]
    if (!file) {
      return
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
      setEmpty(true)
      return
    }

    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async function() {
      const messageInfo = {
        content: reader.result,
        user_first_name: user.first_name,
        user_last_name: user.last_name,
        user_email: user.email,
        kind : "image",
        user_picture: user.picture
      }

      const resp = await sendMessage(user.token, messageInfo)
      if (resp.status !== 200) {
        return
      }

      
      setMessage('')
      setEmpty(false)
    }
  }

  let buttonBackClass = showButton ? 'block' : 'hidden'

  return (
    <>
      <div className="flex-1 justify-between flex flex-col h-screen relative">
        <div className="flex sm:items-center justify-between p-3 border-b border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                  
              <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 h-10 rounded-full"/>
              </div>
              <div className="flex flex-col leading-tight">
                  <div className="text-base mt-1 flex items-center">
                    <span className="text-gray-700 mr-3 text-2xl font-semibold"></span>
                  </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">

              {/* <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
              </button>
              <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
              </button>
              <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
              </button> */}
            </div>
        </div>

        <div id="messages" onScroll={handleScroll} className="bg-gray-100 flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch ">
            {messages.map((message, index) => (
              <div key={index}>
                {<Message message={message} />}
              </div>
            ))}
  
            <div className='!m-0' ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-4">
            <form className="relative flex" onSubmit={addMessage}>
              {/* <span className="absolute inset-y-0 flex items-center">
                  <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                    </svg>
                  </button>
              </span> */}
              <InputChat reference={inputChat} message={message} handleOnChange={handleOnChange} empty={empty} />

              <div className="absolute right-0 items-center inset-y-0 sm:flex">
                  <label htmlFor='file' type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                    </svg>
                    <input type="file" id='file' className='hidden' accept='.png, .jpeg, .jpg' onChange={handleInputFile}/>
                  </label>
                  {/* <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </button> */}
                  {/* <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button> */}
                  <button className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
              </div>
            </form>
        </div>

        <div className={"absolute bottom-24 right-0 bg-white border rounded-l-lg p-2 cursor-pointer transition-all delay-100 " + buttonBackClass} onClick={scrollToBottom}>
            <div className='p-0.5 rounded-full border border-blue-500'>
              <IoArrowDown size={14} color='#3b83f6' />
            </div>
        </div>
      </div>
    </>
  )
}

export default Chat
