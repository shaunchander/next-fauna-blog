import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { gql } from 'graphql-request'
import { graphQLClient } from '../../../graphql/client'

const options = {
	// Configure one or more authentication providers
	providers: [
		Providers.Discord({
			clientId: process.env.DISCORD_CLIENT,
			clientSecret: process.env.DISCORD_SECRET,
		}),
		// ...add more providers here
	],

	secret: process.env.HASH,
	callbacks: {
		signIn: async (user, account, profile) => {
			// Check if user exists
			const data = await graphQLClient.request(
				gql`
					query GetAuthor($name: String!) {
						author(name: $name) {
							_id
						}
					}
				`,
				{
					name: user.name,
				}
			)

			if (data.author) return Promise.resolve(true)

			// If the user didn't exist then create them.

			await graphQLClient.request(
				gql`
					mutation CreateAuthor($name: String!) {
						createAuthor(data: { name: $name }) {
							_id
						}
					}
				`,
				{
					name: user.name,
				}
			)
			return Promise.resolve(true)
		},
	},
}

export default (req, res) => NextAuth(req, res, options)
