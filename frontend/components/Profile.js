import Link from "next/link"
import { formatDid } from "../utils/formatDid"
import withLit from "../utils/withLit"
const Profile = () => {
    if(typeof window !== 'undefined' && typeof window.did !== 'undefined')
    return (
        <div class="p-6 rounded-xl flex items-center space-x-4">
            <div class="shrink-0">
                <img class="h-12 w-12" src="/profile.png" alt="" />
            </div>
            <div>
                <div class="text-xl font-medium text-black">User</div>
                <div class="text-slate-500">{formatDid(window.did._id)}</div>
            </div>
        </div>
    )
    else return (
        <NoProfile/>
    )
}

const NoProfile = () => {
    return (
        <Link href='/'>
            <a className='inline-flex items-center p-2 mr-4 '>
                <span className='items-center justify-center w-full px-3 py-2 font-bold text-black rounded lg:inline-flex lg:w-auto hover:underline decoration-4'>
                    LOGIN
                </span>
            </a>
        </Link>

    )
}

export default withLit(Profile)