'use strict'

var each = require('lodash.foreach')
  ,queriesContext = require.context('./queries', true, /.*/)



// Expose base query class
const QueryBuilder = require('./query')

// And all typed queries
each(queriesContext.keys(), function(key) {
  QueryBuilder[key.replace('.js', '')] = (query) => {
    return new queriesContext[key](undefined, query)
  }
})

module.exports.default = QueryBuilder
