import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

const Market = () => {
   
  const router = useRouter()


  const handleClick = e => {
    e.preventDefault()
    router.push('/item')
  }
  
  return ( 
        <div className="">
   
<div className="flex items-center w-screen min-h-screen bg-indigo-100">
  <div className="container flex flex-wrap items-start ml-auto mr-auto">
   
    <div className="w-full pl-5 mt-4 mb-4 lg:pl-2">
    
    <h1 className="text-3xl font-extrabold text-gray-700 lg:text-4xl">
        SHOP NOW
    </h1>
    <p>Up to 70% OFF</p>
</div>
    

    <div className="w-full pl-5 pr-5 mb-5 md:w-1/2 lg:w-1/4 lg:pl-2 lg:pr-2">
      <div className="p-2 transition duration-300 transform bg-white rounded-lg m-h-64 hover:translate-y-2 hover:shadow-xl">
        <figure className="mb-2">
          <img src="/bag.jpeg" alt="/" className="ml-auto mr-auto h-50" />
        </figure>
        <div className="flex flex-col p-4 bg-blue-700 rounded-lg">
          <div>
            <h5 className="text-2xl font-bold leading-none text-white">
              HANDBAG
            </h5>
            <span className="text-xs leading-none text-gray-400">GUCCI</span>
          </div>
          <div className="flex items-center">
            <div className="text-lg font-light text-white">
              1400 Matic
            </div>
            <button href="#" className="flex w-10 h-10 ml-auto text-white transition duration-300 bg-blue-500 rounded-full hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none" onClick={handleClick}>
              <svg xmlns="/" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-auto stroke-current">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

      
    <div className="w-full pl-5 pr-5 mb-5 md:w-1/2 lg:w-1/4 lg:pl-2 lg:pr-2">
      <div className="p-2 transition duration-300 transform bg-white rounded-lg m-h-64 hover:translate-y-2 hover:shadow-xl">
        <figure className="mb-2">
          <img src="/bag03.jpeg" alt="" className="ml-auto mr-auto h-50" />
        </figure>
        <div className="flex flex-col p-4 bg-blue-700 rounded-lg">
          <div>
            <h5 className="text-2xl font-bold leading-none text-white">
              HANDBAG
            </h5>
            <span className="text-xs leading-none text-gray-400">GUCCI</span>
          </div>
          <div className="flex items-center">
            <div className="text-lg font-light text-white">
              1600 Matic
            </div>
            <button href="#" className="flex w-10 h-10 ml-auto text-white transition duration-300 bg-blue-500 rounded-full hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none">
              <svg xmlns="/" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-auto stroke-current">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>


   
    <div className="w-full pl-5 pr-5 mb-5 md:w-1/2 lg:w-1/4 lg:pl-2 lg:pr-2">
      <div className="p-2 transition duration-300 transform bg-white rounded-lg m-h-64 hover:translate-y-2 hover:shadow-xl">
        <figure className="mb-2">
          <img src="/bag05.jpeg" alt="" className="ml-auto mr-auto h-50" />
        </figure>
        <div className="flex flex-col p-4 bg-blue-700 rounded-lg">
          <div>
            <h5 className="text-2xl font-bold leading-none text-white">
              HANDBAG
            </h5>
            <span className="text-xs leading-none text-gray-400">GUCCI</span>
          </div>
          <div className="flex items-center">
            <div className="text-lg font-light text-white">
              2000 Matic
            </div>
            <button href="#" className="flex w-10 h-10 ml-auto text-white transition duration-300 bg-blue-500 rounded-full hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none">
              <svg xmlns="/" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-auto stroke-current">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

      
    <div className="w-full pl-5 pr-5 mb-5 md:w-1/2 lg:w-1/4 lg:pl-2 lg:pr-2">
      <div className="p-2 transition duration-300 transform bg-white rounded-lg m-h-64 hover:translate-y-2 hover:shadow-xl">
        <figure className="mb-2">
          <img src="/bag04.jpeg" alt="" className="ml-auto mr-auto h-50" />
        </figure>
        <div className="flex flex-col p-4 bg-blue-700 rounded-lg">
          <div>
            <h5 className="text-2xl font-bold leading-none text-white">
              HANDBAG
            </h5>
            <span className="text-xs leading-none text-gray-400">GUCCI</span>
          </div>
          <div className="flex items-center">
            <div className="text-lg font-light text-white">
              1700 Matic
            </div>
            <button href="#" className="flex w-10 h-10 ml-auto text-white transition duration-300 bg-blue-500 rounded-full hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none">
              <svg xmlns="/" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-auto stroke-current">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
</div>





      
</div>
)        
}
 
export default Market;
