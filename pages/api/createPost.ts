import { NextApiRequest, NextApiResponse } from 'next'

import { gql } from 'graphql-request'
import { graphQLClient } from '../../graphql/client'

import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') return res.status(405).send('Method not allowed.')

	const session = await getSession({ req })

	if (!session) {
		return res.status(400).send('Access denied.')
	}

	try {
		const { title, content, name } = JSON.parse(req.body)

		if (!title || !content || !name) throw new Error()

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
		console.log(err)
		res.status(400).send('Something went wrong 😔')
	}
}
