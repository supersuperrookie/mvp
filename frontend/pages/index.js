import { useRouter } from "next/router"

export default function RedirectPage() {
  const router = useRouter()
  if(typeof window !== 'undefined') {
    router.push('/collections')
  }
  return(
    <></>
  )
}