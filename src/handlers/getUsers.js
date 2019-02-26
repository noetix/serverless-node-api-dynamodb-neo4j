import { exec } from '../services/graph'
import { parse } from 'parse-neo4j'

export default async (event) => {
    const query = `
        MATCH (u:User)<-[:AUTHOR]-(p:Post)
        WITH p, u
        ORDER BY p.created DESC
        RETURN u as user, last(collect(p)) as post
    `

    const results = await exec(query)
        .then(parse)
        .then(data => data.map(({ user, post }) => ({
            ...user,
            lastest_post: post
        })))

    return {
        statusCode: 200,
        body: JSON.stringify(results)
    }
}
