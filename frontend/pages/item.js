import React from 'react'
import Image from 'next/image'

const item = () => {
  return (
    <center>
   <div className="md:w-[50rem] md:h-[20.5rem] w-[20.5rem] h-[40rem] p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-700 flex flex-col ease-linear duration-300 md:flex-row-reverse">
      <div className="relative w-full h-full shadow-md rounded-2xl basis-2/3">
        <div className="relative w-full h-full border-2 border-white rounded-2xl">
         
         <h1 className="m-3 text-4xl font-bold dark:text-white">
         GUCCI BAG
        </h1>
        <p className="m-3 font-bold text-1xl dark:text-white">DID</p>
        <p className="m-3 font-bold text-1xl dark:text-white">Description: first leather bag created in EthDenver 2022</p>
        <p className="m-3 font-bold text-1xl dark:text-white">Dimension: 9.5/4.5/7.5 inches</p>
        <p className="m-3 font-bold text-1xl dark:text-white">Material: Pebble Grain Leather</p>
        <button className='m-3 font-bold text-1xl class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"'>1400 Matic</button>
        <div className="flex flex-row flex-wrap justify-around pt-16 pl-2 pr-2 ">
        </div>
   
        </div>
      </div>

      <div className="w-full h-full mr-2 rounded-2xl">
     <img 
            src="/bag.jpeg"
            alt="thumbnail"
            layout="fill"
            className=" rounded-2xl"
          />

      </div>
    </div>
    </center>
  )
}

export default item