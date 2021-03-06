'use strict'

var Query = require('../query')
  , util = require('util')
  , utils = require('../utils')




/**
 * Expose
 */
module.exports = TopNQuery




/**
 * TopN query
 *
 * @see http://druid.io/docs/0.6.121/TopNQuery.html
 * @constructor
 * @extends {Query}
 * @param {Druid|Client} client Client instance
 * @param {object} [rawQuery] Raw query data
 */
function TopNQuery(client, rawQuery) {
  Query.call(this, client, rawQuery)
}
util.inherits(TopNQuery, Query)


Query.type(TopNQuery, 'topN')
Query.required(TopNQuery, 'dimension', 'threshold', 'metric', 'granularity', 'aggregations', 'intervals')
Query.addFields(TopNQuery, ['dimension', 'threshold', 'metric', 'granularity', 'filter', 'aggregations', 'postAggregations', 'interval', 'intervals'])
