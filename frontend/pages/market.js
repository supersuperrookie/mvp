import Image from "next/image";

const Market = () => {
    return ( 
        <div className="w-full max-w-md bg-white border rounded shadow-lg md:w-1/2 border-palette-lighter">
        
        <h1 className="py-2 mt-4 text-4xl font-extrabold leading-relaxed text-center font-primary text-palette-primary sm:py-4">
                SHOP 
             </h1>
        
             <Image
                src="/bag.jpeg"
                alt="bag"
                width={500}
                height={300}
                />
        
        </div>
    )        
}
 
export default Market;
