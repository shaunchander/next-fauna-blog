import { useState, FormEvent } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

// Component imports
import Layout from '../../components/Layout'
const Create = () => {
	// Session
	const [session, loading] = useSession()

	// State
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [error, setError] = useState(false)

	// Router
	const router = useRouter()

	// Helpers
	const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const data = await fetch('/api/createPost', {
				method: 'post',
				body: JSON.stringify({ title, content, name: session.user.name }),
			})
			if (data.status === 400) throw new Error(data.statusText)

			// If successful, redirect to home page
			router.push('/')
		} catch (err) {
			setError(true)
		}
	}

	if (!session) {
		return (
			<Layout>
				<p>You must be authenticated to access this page ✋</p>
			</Layout>
		)
	}

	return (
		<Layout>
			<div>
				<h1>Create a post</h1>
				<br />
				<form
					method='POST'
					action='/api/createPost'
					onSubmit={handleSubmission}>
					<div>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							placeholder='Title...'
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='content'>Content</label>
						<textarea
							placeholder='Content...'
							required
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</div>
			{error && (
				<>
					<br />
					<p>An error occured, please try again.</p>
				</>
			)}
			<style jsx>
				{`
					div {
						display: flex;
						flex-direction: column;
					}

					form {
						display: grid;
						grid-gap: 24px;
					}

					label {
						display: block;
						margin-bottom: 10px;
					}

					textarea {
						appearence: none;
						resize: none;
						height: 128px;
						font-family: inherit;
					}

					button {
						width: 256px;
					}
				`}
			</style>
		</Layout>
	)
}

export default Create
