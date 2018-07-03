'use strict'

var errors = require('./errors')
  , FieldError = errors.FieldError
  , FieldTypeError = errors.FieldTypeError
  , slice = Array.prototype.slice
  , undefined


/**
 * Arguments object to array
 *
 * @param {Arguments} args
 * @param {number} [num=0] Array#slice start index
 * @returns {Array}
 */
export const args = function(args, num) {
  if (arguments.length === 1) {
    num = 0
  }

  return slice.call(args, num)
}


var FIELD_SETTERS = {
  boolean: function(value) {
    return !!((value||false).valueOf())
  },

  object: function(value) {
    if (typeof value !== 'object') {
      throw new FieldTypeError(this + '', 'object')
    }

    return value
  },

  number: function(value) {
    var num = value
    if (typeof num !== 'number') {
      num = parseFloat(num) || parseInt(num, 10)
    }

    if (isNaN(num)) {
      return FieldTypeError(this + '', 'number', value)
    }

    return num
  },

  string: function(value) {
    if (typeof value !== 'string') {
      value = value + ''
    }

    return value
  },

  array: function(value) {
    if (!Array.isArray(value)) {
      value = args(arguments, 0)
    }

    return value
  }
}




/**
 * Parse date
 *
 * @param {string|number|Date} value
 * @throws {FieldError} Throws error if bad value specified
 * @returns {Date}
 */
export const date = function(value) {
  if (value == null) {
    return undefined
  }
  else if (value instanceof Date) {
    return value
  }

  if (~['number', 'string'].indexOf(typeof value)) {
    value = new Date(value)
  }

  if (!(value instanceof Date)) {
    throw new FieldError('Bad date value: ' + value)
  }

  return value
}




/**
 * Get needed setter
 *
 * @param {string} field Query field name
 * @param {string} setter Setter name
 */
export const fieldSetter = function(field, setter) {
  var setterFn = FIELD_SETTERS[setter]
  return setterFn.bind(field)
}




/**
 * Check if value is object and not null
 *
 * @param {*} value Value to check
 * @returns {boolean}
 */
export const isObject = function(value) {
  return value && typeof value === 'object'
}



const globalContext = require.context('./fields', true, /.*/)
/**
 * Load modules from folder and map them to object by filenames.
 *
 * @param {string} dir
 * @returns {Object}
 */
export const moduleMap = function(dir) {
  const availableSubModules = [
    '/aggregations',
    '/dataSources',
    '/extraction-functions',
    '/filters',
    '/granularities',
    '/having',
    '/metrics',
    '/postAggregations',
  ]
  const contextDict = globalContext.keys().reduce((memo, key) => {
    if (key.includes('index.js')) {
      return memo
    }
    const subModuleName = availableSubModules.find(subModule => key.includes(subModule))
    const currentName = key.replace(subModuleName, '').replace(/\.\/|\.js/g, '')
    const currentSubmodule = memo[subModuleName] || {}
    return {
      ...memo,
      [subModuleName]: {
        ...currentSubmodule,
        [currentName]: globalContext(key),
      }
    }
  }, {})

  return contextDict[dir]
}
