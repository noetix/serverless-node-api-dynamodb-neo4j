import hasIn from 'lodash.hasin'
import * as defaultBuilder from './default'
import * as Post from './Post'

// add your custom models here
const models = {
  Post
}

// try find custom loaders before using the default loader
export default (label, action) => (
  hasIn(models, [label, action])
    ? models[label][action]
    : defaultBuilder[action]
)
