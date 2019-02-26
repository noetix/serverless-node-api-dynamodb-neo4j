export default (node) => {
  const data = {
    props: {}
  }

  Object.keys(node).forEach((key) => {
    switch (typeof node[key]) {
      // neo4j doesn't handle complex arrays/objects, so lets stringify them
      case 'array':
      case 'object':
        data.props[key] = JSON.stringify(node[key])
        break

      default:
        data.props[key] = node[key].toString()
        break
    }
  })

  return data
}
