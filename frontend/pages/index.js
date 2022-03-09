import {
  webClient,
  getRecord
} from '../utils/withIdentity'



export default function Home() {
  async function connectCeramic() {
    const cdata = await webClient()
    const {id, selfId, error} = cdata;
  }

  return (
    <>
      <button className="rounded-full" onClick={connectCeramic}>Login</button>
    </>
  )
}
