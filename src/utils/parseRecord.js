import { unmarshalItem } from 'dynamodb-marshaler'
import { singular } from 'pluralize'
import capitalize from 'capitalize'
import parseTableName from './tableName'

export default (event) => {
  const action = event.eventName.toLowerCase()
  // label for node is capitalized singular version of the table name
  const label = capitalize(singular(parseTableName(event.eventSourceARN)))
  const node = event.dynamodb.NewImage ? unmarshalItem(event.dynamodb.NewImage) : null
  const keys = unmarshalItem(event.dynamodb.Keys)

  return {
    action, label, keys, node
  }
}
