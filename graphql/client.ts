import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(
	'https://graphql.fauna.com/graphql',
	{
		headers: {
			authorization: `Bearer ${process.env.FAUNA_KEY}`,
		},
	}
)
