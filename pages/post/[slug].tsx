import { gql } from 'graphql-request'
import { graphQLClient } from '../../graphql/client'

// Component imports
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
const Post = ({ data, error }) => {
	if (error) {
		return (
			<Layout>
				<p>Post not found 😔</p>
			</Layout>
		)
	}

	return (
		<Layout>
			<div>
				<h1>{data.post.title}</h1>
				<br />
				<p>{data.post.content}</p>
			</div>
			<br />
			<h6>Written by {data.post.author.name}</h6>
		</Layout>
	)
}

export default Post

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const data = await graphQLClient.request(
			gql`
				query Post($slug: String!) {
					post(slug: $slug) {
						title
						author {
							name
						}
						content
					}
				}
			`,
			{
				slug: context.params.slug,
			}
		)

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
