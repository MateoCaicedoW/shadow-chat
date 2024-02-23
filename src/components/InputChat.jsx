function InputChat({message, handleOnChange, empty, reference}){
    return (
        <textarea ref={reference} autoFocus id="prompt-textarea" tabIndex="0" data-id="root" rows="1" placeholder="Write your message!" className={"m-0 w-full resize-none  py-[10px] pr-10 md:py-3.5 md:pr-12 md:pl-4 border  focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md  " + (empty ? ' border border-red-500' : '') }  onChange={handleOnChange} value={message}>

        </textarea>
    )
}

export default InputChat;