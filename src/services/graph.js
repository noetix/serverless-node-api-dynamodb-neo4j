import { v1 as neo4j } from 'neo4j-driver'

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
)

export const exec = async (query, data) => {
  const session = driver.session()

  return session
    .run(query, data)
    .then((result) => {
      session.close()
      driver.close()

      return result
    })
}
