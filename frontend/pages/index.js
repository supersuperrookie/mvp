import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>WELCOME</h1>
      <p className={styles.text}>ITEM 1</p>
      <p className={styles.text}>ITEM 2</p>
   
    </div>
  )
}
