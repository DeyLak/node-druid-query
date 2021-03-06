'use strict'

var FieldError = require('../../errors').FieldError


/**
 * Last of float values
 *
 * @see http://druid.io/docs/0.6.120/Aggregations.html
 *
 * @param {string} fieldName name of the metric column
 */
module.exports = function floatLast(fieldName) {
  if (!fieldName) {
    throw new FieldError('Missing metric column')
  }

  this.fieldName = fieldName
}
