import convertToProps from '../utils/convertToProps'

const insert = ({ id }, node, label) => {
  const query = `
    MERGE (n:${label} { id: '${id}' })
    SET n = $props
  `
  const data = convertToProps(node)

  return { query, data }
}

const modify = insert

const remove = ({ id }, node, label) => {
  const query = `
    MATCH (n:${label} { id: '${id}' })
    DETACH DELETE n
  `
  const data = {}

  return { query, data }
}

export {
  insert,
  modify,
  remove
}
