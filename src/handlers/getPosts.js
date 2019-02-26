import { exec } from '../services/graph'
import { parse } from 'parse-neo4j'

export default async (event) => {
    const query = `
        MATCH (p:Post)-[:AUTHOR]->(u:User)
        RETURN p as post, u as user
    `

    const results = await exec(query)
        .then(parse)
        .then(data => data.map(({ post, user }) => ({
            ...post,
            author: user
        })))

    return {
        statusCode: 200,
        body: JSON.stringify(results)
    }
}
