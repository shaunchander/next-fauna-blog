import Link from 'next/link'

const Header = () => {
	return (
		<header>
			<h1>NextFauna Blog</h1>
			<p>A blog example site made with Fauna, Next.js, and new.css!</p>
			<nav>
				<Link href='/'>
					<a>Home</a>
				</Link>
				<span>&nbsp;/&nbsp;</span>
				<Link href='/contact'>
					<a>Contact</a>
				</Link>
			</nav>
		</header>
	)
}

export default Header
