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
    <div class="ml-80 mr-80">
      <div class="pb-10">
        <h1 class="text-8xl font-bold text-slate-200">ON SALE</h1>
      </div>
      <div class="flex flex-row flex-wrap justify-start items-stretch gap-5">
        <a href="#" class="">
          <img src="https://place-hold.it/350x300?text=BAG" alt="" />
        </a>
        <a href="#" class="">
          <img src="https://place-hold.it/350x300?text=BAG" alt="" />
        </a>
        <a href="#" class="">
          <img src="https://place-hold.it/350x300?text=BAG" alt="" />
        </a>
        <a href="#" class="">
          <img src="https://place-hold.it/350x300?text=BAG" alt="" />
        </a>
        <a href="#" class="">
          <img src="https://place-hold.it/350x300?text=BAG" alt="" />
        </a>
      </div>
    </div>
  )
}

export default Market;
