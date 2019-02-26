// change this regex pattern if you change your table name format
const pattern = /table\/(.+)\/stream/

export default (arn) => {
  const result = pattern.exec(arn)

  if (result && result.length > 1)
    return result[1]

  return null
}
