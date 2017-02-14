import validateJs from 'validate.js'
import flatToNested from 'flat-to-nested'
import capitalize from 'lodash/capitalize'
import lowerCase from 'lodash/lowerCase'
import mapValues from 'lodash/mapValues' // not using fp on purpose

/*
 * Switch the order of arguments, partially apply constraints, specify error format
 */
export default function validate (constraints) {
  return attributes => flatToNested(validateJs(attributes, constraints, { format: 'lp' }))
}

function lpFormat (errors) {
  return mapValues(validateJs.formatters.grouped(errors), stripNamespace)
}

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
