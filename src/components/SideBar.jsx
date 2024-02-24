
export const SideBar = () => {
    return (
        <div class="w-1/4 bg-white border-r border-gray-300">
    
            <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-blue-500 text-white">
                <h1 class="text-2xl font-semibold text-white">Chats</h1>
                <div class="relative">
                <button id="menuButton" class="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                    </svg>
                </button>
                
                <div id="menuDropdown" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                    <ul class="py-2 px-3">
                    <li><a href="#" class="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                    <li><a href="#" class="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                    
                    </ul>
                </div>
                </div>
            </header>
        
        
            <div class="overflow-y-auto p-3" style={{maxHeight: "calc(100vh - 66px)"}}>
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">Alice</h2>
                    <p class="text-gray-600">Hoorayy!!</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">Martin</h2>
                    <p class="text-gray-600">That pizza place was amazing! We should go again sometime. 🍕</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">Charlie</h2>
                    <p class="text-gray-600">Hey, do you have any recommendations for a good movie to watch?</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">David</h2>
                    <p class="text-gray-600">I just finished reading a great book! It was so captivating.</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">Ella</h2>
                    <p class="text-gray-600">What's the plan for this weekend? Anything fun?</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">Fiona</h2>
                    <p class="text-gray-600">I heard there's a new exhibit at the art museum. Interested?</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">George</h2>
                    <p class="text-gray-600">I tried that new cafe downtown. The coffee was fantastic!</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">Hannah</h2>
                    <p class="text-gray-600">I'm planning a hiking trip next month. Want to join?</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">Ian</h2>
                    <p class="text-gray-600">Let's catch up soon. It's been too long!</p>
                </div>
            </div>
            
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">Jack</h2>
                    <p class="text-gray-600">Remember that hilarious joke you told me? I can't stop laughing!</p>
                </div>
            </div>
            
            
            </div>
        </div>
    )
}