import { useState } from 'react'

// Component imports
import Layout from '../components/Layout'

const Contact = () => {
	// State
	const [message, setMessage] = useState(false)

	return (
		<Layout>
			<h2>Contact me</h2>
			<br />
			<form>
				<div>
					<label htmlFor='name'>Name</label>
					<input type='text' placeholder='Name...' id='name' />
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='text' placeholder='Email...' id='email' />
				</div>
				<div>
					<label htmlFor='message'>Message</label>
					<textarea placeholder='Message...' id='message' />
				</div>
				<button
					type='submit'
					onClick={(e) => {
						e.preventDefault()
						setMessage(true)
					}}>
					Submit
				</button>
			</form>

			{message && <p>Let's just pretend that submitted...</p>}

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

export default Contact
