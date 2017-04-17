/**
 * Returns the component name if possible to determine, or just `Component`. This is helpful
 * for higher order components to call on their `wrapped` component so the name that shows up
 * in the React Dev Tools includes the name `wrapped` component making debugging much easier.
 * 
 * 
 * For React classes and named functional components, the name will be returned. For inline
 * functional components without a name, `Component` will be returned. If `displayName` is 
 * explicitly set, then that will be returned.
 * 
 * @param {Function} Component - A React component
 * @returns {String} - The component name if it is possible to determine, otherwise `Component`
 * @example
 * 
 * // Inline functional component
 * getDisplayName(() => <div></div>) // `Component`
 *
 * // Named functional components
 * const Foo = () => <div></div>
 * getDisplayName(Foo) // `Foo`
 *
 * function Foo () {
 *   return <div></div>
 * }
 * getDisplayName(Foo) // `Foo`
 * 
 * // Class
 * class Foo extends React.Component {
 *   render() {
 *     return <div></div>
 *   }
 * }
 * getDisplayName(Foo) // `Foo`
 * 
 * // Explicit `displayName`
 * class Foo extends React.Component {
 *   static displayName = 'Bar'
 *   render() { return <div></div> }
 *  }
 * getDisplayName(Foo)) // `Bar`
 */
export default function (Component) {
  return Component.displayName || Component.name || 'Component'
}
