'use strict'

var createCustomError = require('custom-error-generator')

var QUERY_LINKS = {
  groupBy:         'http://druid.io/docs/0.6.121/GroupByQuery.html',
  search:          'http://druid.io/docs/0.6.121/SearchQuery.html',
  segmentMetadata: 'http://druid.io/docs/0.6.121/SegmentMetadataQuery.html',
  timeBoundary:    'http://druid.io/docs/0.6.121/TimeBoundaryQuery.html',
  timeseries:      'http://druid.io/docs/0.6.121/TimeseriesQuery.html',
  topN:            'http://druid.io/docs/0.6.121/TopNQuery.html'
}




/**
 * General error
 *
 * @class DruidError
 * @extends Error
 */
export const DruidError = createCustomError('DruidError')




/**
 * Used when query misses some mandatory fields
 *
 * @class MissingFieldError
 * @extends Error
 */
export function MissingFieldError(field, queryType) {
  Error.call(this)
  this.name = 'MissingFieldError'
  /**
   * Human-readable error message
   *
   * @type {string}
   */
  this.message = 'Query field ' + field + ' is required for ' + queryType + ' query.'


  /**
   * Link to Druid documentation describing query type
   *
   * @type {string}
   */
  this.moreInfo = QUERY_LINKS[queryType]


  /**
   * No comments, dudes.
   *
   * @type {string}
   */
  this.missingField = field


  /**
   * No comments, really!
   *
   * @type {string}
   */
  this.queryType = queryType
}




/**
 * Any field error
 *
 * @class FieldError
 * @extends Error
 */
export const FieldError = createCustomError('FieldError')




/**
 * Thrown when field value has incorrect type
 *
 * @class FieldTypeError
 * @extends Error
 */
export function FieldTypeError(field, type, value) {
  Error.call(this)
  this.name = 'FieldTypeError'
  if (field) {
    /**
     * Good error message
     *
     * @type {string}
     */
    this.message = 'Field ' + field + ' must be ' + type
  }
  else {
    this.message = 'Invalid ' + type + ': ' + value
  }
}
