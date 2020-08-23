import { gql } from 'graphql-request'
import { graphQLClient } from '../graphql/client'

// Component imports
import Layout from '../components/Layout'
import Article from '../components/Article'
import { GetServerSideProps } from 'next'

export default function Home({ data, error }) {
	if (error)
		return (
			<Layout>
				<p>Failed to load.</p>
			</Layout>
		)
	return (
		<Layout>
			<div className='container'>
				{data.allPosts.data.map((article, i) => (
					<Article
						key={i}
						author={article.author.name}
						preview={article.content}
						url={`/post/${article.slug}`}
						title={article.title}
					/>
				))}
			</div>

			<style jsx>
				{`
					.container {
						display: grid;
						grid-gap: 32px;
					}
				`}
			</style>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const data = await graphQLClient.request(gql`
			{
				allPosts {
					data {
						title
						content
						slug
						author {
							name
						}
					}
				}
			}
		`)
		return {
			props: {
				data,
			},
		}
	} catch (err) {
		return {
			props: {
				error: true,
			},
		}
	}
}
