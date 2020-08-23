import Link from 'next/link'
import { signOut, signIn, useSession } from 'next-auth/client'

const Header = (props) => {
	const [session, loading] = useSession()
	return (
		<header>
			<h1>NextFauna Blog</h1>
			<p>A blog example site made with Fauna, Next.js, and new.css!</p>
			<div className='container'>
				<nav>
					<Link href='/'>
						<a>Home</a>
					</Link>
					<span>&nbsp;/&nbsp;</span>
					<Link href='/contact'>
						<a>Contact</a>
					</Link>
					<span>&nbsp;/&nbsp;</span>
					{session ? (
						<span>Logged in as {session.user.name}</span>
					) : (
						<a
							href='#'
							onClick={(e) => {
								e.preventDefault()
								signIn('discord')
							}}>
							Log In
						</a>
					)}
				</nav>
				{session && (
					<nav>
						<Link href='/post/create'>
							<a>Create Post</a>
						</Link>
						<span>&nbsp;/&nbsp;</span>
						<a
							href='/'
							onClick={(e) => {
								e.preventDefault()
								signOut()
							}}>
							Logout
						</a>
					</nav>
				)}
			</div>

			<style jsx>{`
				.container {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
				}
			`}</style>
		</header>
	)
}

export default Header

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			data: 'yes',
		},
	}
}
