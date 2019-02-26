import parseRecord from '../utils/parseRecord'
import findModel from '../models'
import { exec } from '../services/graph'

export default async (event) => Promise.all(
    event.Records.map(record => {
        const { label, action, keys, node } = parseRecord(record)
        const { query, data } = findModel(label, action)(keys, node, label)

        return exec(query, data)
    })
)
