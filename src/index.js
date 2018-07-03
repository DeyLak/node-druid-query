'use strict'
const utils = require('./utils')


var each = require('lodash.foreach')
  ,queriesContext = require.context('./queries', true, /.*/)



// Expose base query class
const QueryBuilder = require('./query')
// And all typed queries
each(queriesContext.keys(), function(key) {
  QueryBuilder[key.replace(/\.\/|\.js/g, '')] = function (query) {
    const QueryConstructor = queriesContext(key)
    return new QueryConstructor(undefined, query)
  }
})
export default QueryBuilder
