import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const { user, error, isLoading } = useUser();
	const [response, setResponse] = useState();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const text = e.target.text.value;
		const res = await fetch('/api/yt-transcribe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ link: text }),
		});
		console.log('res', res);
		const data = await res.json();
		console.log(data);
		setResponse(data.transcription);
	}

  return (
    <>
      <Head>
        <title>DocumentBot</title>
        <meta name="description" content="Create Documentation bots" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
			{user ? (
				<Link href="/api/auth/logout"><button>Logout</button></Link>
			) : null}
			<main className={styles.main}>
				<h1>Create Documentation bots</h1>
				<p>Based in any knowledge base</p>
				<div className={styles.cta}>
					<p>Price: </p><br/>
					{user ? (
						<p>We'll send the payment link to your email address</p>
					) : (
						<Link href="/api/auth/login">
							<button className={styles.suscribe}><u>20 USD/month</u> + servers utilization</button>
						</Link>
					)}
				</div>
				<div className={styles.content}>
				</div>
      </main>
    </>
  )
}
