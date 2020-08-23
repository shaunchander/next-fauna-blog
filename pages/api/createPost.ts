import { NextApiRequest, NextApiResponse } from 'next'

import { gql } from 'graphql-request'
import { graphQLClient } from '../../graphql/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, content, name } = JSON.parse(req.body)

	try {
		// Get the ID of the author
		const data = await graphQLClient.request(
			gql`
				query GetAuthor($name: String!) {
					author(name: $name) {
						_id
					}
				}
			`,
			{
				name,
			}
		)

		// Create the post
		await graphQLClient.request(
			gql`
				mutation CreatePost(
					$title: String!
					$content: String!
					$authorID: ID!
					$slug: String!
				) {
					createPost(
						data: {
							title: $title
							content: $content
							author: { connect: $authorID }
							slug: $slug
						}
					) {
						_id
					}
				}
			`,
			{
				title,
				content,
				authorID: data.author._id,
				slug: title.toLowerCase().split(' ').join('-'),
			}
		)

		res.send('Created 👌')
	} catch (err) {
		res.status(400).send('Something went wrong 😔')
	}
}
