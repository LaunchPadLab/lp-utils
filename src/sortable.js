import React from 'react'
import PropTypes from 'prop-types'
import orderBy from 'lodash/orderBy'
import get from 'lodash/fp/get'
import getDisplayName from './get-display-name'

/**
 * A function that returns a React HOC that provides a sort function the wrapped component.
 * Given a `sortPath`, this function will compare the values of two objects at that path.
 * The wrapped component will receive the following props:
 *
 * - `ascending`: a boolean indicating whether the sort is ascending or not
 * - `descending`: a boolean indicating whether the sort is descending or not
 * - `sortPath`: a string indicating the current sort comparison path in dot notation
 * - `sort`: a function that can be used to sort an array of objects
 * - `setAscending`: a function to set whether or not objects are sorted in ascending order
 * - `setDescending`: a function to set whether or not objects are sorted descending order
 * - `setSortPath`: a function for setting `sortPath`
 * - `setSortFunc`: a function for setting a custom sort function
 *
 * `sortable` also exposes a `sortablePropTypes` object for these props.
 *
 * **Options**
 * 
 * `getSet` may be passed an options object containing the following keys:
 * - `ascending`: Whether the sort is initially ascending (default=`true`)
 * - `sortPath`: The initial `sortPath`
 * - `sortFunc`: The initial `sortFunc`
 *
 * @name sortable
 * @type Function
 * @param {object} options - Options for the HOC as specified above.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 * @example
 *
 * function SortedPeopleList ({ people, sort, ascending, setAscending }) {
 *   return (
 *     <div>
 *       <ol>
 *         { 
 *           sort(people).map(person => 
 *             <li>`${ person.name } - ${ person.age }`</li>
 *           )
 *         }
 *       </ol>
 *       <button onClick={ () => setAscending(!ascending) }>
 *         Reverse order
 *       </button>
 *     </div>
 *   )
 * }
 * 
 * SortedPeopleList.propTypes = {
 *   ...sortablePropTypes,
 *   people: PropTypes.arrayOf(PropTypes.shape({
 *    name: PropTypes.string.isRequired,
 *    age: PropTypes.string.isRequired,
 *   })),
 * }
 *
 * export default compose(
 *    sortable({ 
 *      sortPath: 'age',
 *    }),
 * )(SortedPeopleList)
 *
**/

export default function sortable (options={}) {

  // Arguments are used to set initial state in constructor
  const { ascending=true, sortPath, sortFunc } = options

  return WrappedComponent => 

    class Sortable extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `Sortable(${getDisplayName(WrappedComponent)})`

      constructor (props) {
        super(props)
        this.state = { ascending, sortPath, sortFunc }
        // Bind class methods
        this.sort = this.sort.bind(this)
        this.setAscending = this.setAscending.bind(this)
        this.setDescending = val => this.setAscending(!val)
        this.setSortFunc = this.setSortFunc.bind(this)
        this.setSortPath = this.setSortPath.bind(this)
      }

      setAscending (ascending) {
        this.setState({ ascending })
      }

      setSortFunc (sortFunc) {
        this.setState({ sortFunc })
      }

      setSortPath (newPath, doToggle=true) {
        // By default, toggles ascending if the path is already selected
        let { sortPath, ascending } = this.state
        if (newPath === sortPath) {
          if (doToggle) ascending = !ascending
        } else {
          // Default to ascending when switching paths
          ascending = true
        }
        this.setState({ sortPath: newPath, ascending })
      }

      sort (array) {
        const { ascending, sortFunc, sortPath } = this.state
        // Use custom sort if provided, otherwise default to orderBy()
        if (sortFunc) {
          const sorted = [...array].sort(sortFunc)
          if (!ascending) sorted.reverse()
          return sorted
        } else {
          const order = ascending ? 'asc' : 'desc'
          const sorted = orderBy(array, item => get(sortPath, item), order)
          return sorted
        }
      }

      render () {
        const { ascending, sortPath } = this.state
        return (
          <WrappedComponent 
            { ...{ 
              ascending, 
              descending: !ascending,
              sortPath,
              sort: this.sort, 
              setAscending: this.setAscending,
              setDescending: this.setDescending,
              setSortFunc: this.setSortFunc,
              setSortPath: this.setSortPath, 
              ...this.props,
            }} 
          />
        )
      }
    }
}

// Proptypes for components wrapped by sortable

export const sortablePropTypes = {
  ascending: PropTypes.bool,
  descending: PropTypes.bool,
  sortPath: PropTypes.string,
  sort: PropTypes.func,
  setAscending: PropTypes.func,
  setDescending: PropTypes.func,
  setSortPath: PropTypes.func,
  setSortFunc: PropTypes.func,
}

