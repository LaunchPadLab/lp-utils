import validateJs from 'validate.js'
import capitalize from 'lodash/capitalize'
import lowerCase from 'lodash/lowerCase'
import mapValues from 'lodash/mapValues' // not using fp on purpose
import flatToNested from './flat-to-nested'

/**
 * A wrapper around the `validate` function exported from
 * {@link https://validatejs.org/|Validate JS} to make it work seamlessly with
 * {@link http://redux-form.com/|Redux Form}.
 * 
 * @param {Object} constraints - A 'flat' object containing constraints in the
 * format specified by Validate JS. These are key-value pairs where the keys
 * correspond to keys in the data that will be validated. This is a 'flat'
 * object in that nested data must be accessed using a string path
 * (ex. 'foo.bar') as the key.
 * 
 * @returns {Function} validate - A function that takes an object of data to be validated
 * and returns a 'nested' object containing errors in the format specified by
 * Redux Form.
 * 
 * @example
 * 
 * const data = {
 *   name: 'Foo',
 *   address: {
 *     zip: '12'
 *   }
 * }
 * 
 * const constraints = {
 *   name: {
 *     presence: true
 *   },
 *   'address.zip': {
 *     presence: true,
 *     length: { is: 5 }
 *   }
 * }
 * 
 * validate(constraints)(data)
 * 
 * // {
 * //   address: {
 * //     zip: ['Zip is the wrong length (should be 5 characters)']
 * //   }
 * // }
 */
export default function validate (constraints) {
  return attributes => {
    
    // validate the data using Validate JS and our custom format
    const errors = validateJs(attributes, constraints, { format: 'lp' })

    // tranform the errors from a 'flat' structure to a 'nested' structure
    return flatToNested(errors)
  }
}

function lpFormat (errors) {
  return mapValues(validateJs.formatters.grouped(errors), stripNamespace)
}

// A custom format that replicates the Validate JS default while handling
// flat string paths.
validateJs.formatters.lp = lpFormat

function stripNamespace (errors, attribute) {

  const exclude = capitalize(attribute
    .split('.')
    .slice(0, -1)
    .map(attr => lowerCase(attr))
    .join(' ')
  ) + ' '

  return errors.map(error => capitalize(error.replace(exclude, '')))
}
