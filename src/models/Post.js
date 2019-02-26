import convertToProps from '../utils/convertToProps'

const insert = ({ id }, node) => {
  const query = `
    MERGE (p:Post { id: '${id}' })
    SET p = $props
    MERGE (u:User { id: '${node.user_id}' })
    MERGE (p)-[:AUTHOR]->(u)
  `
  const data = convertToProps(node)

  return { query, data }
}

const modify = insert

export {
  insert,
  modify
}
