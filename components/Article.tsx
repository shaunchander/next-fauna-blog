// Component imports
import Link from 'next/link'

interface Props {
	author: string
	preview: string
	title: string
	url: string
}

const Article = ({ author, preview, title, url }: Props) => {
	return (
		<div>
			<h3>{title}</h3>
			<p>{preview.substr(0, 30)}...</p>
			<h6>Written by {author}</h6>
			<Link href={url}>
				<a>Read more...</a>
			</Link>
		</div>
	)
}

export default Article
