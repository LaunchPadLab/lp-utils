
## Api

### `getDisplayName(Component)`
A helper method for getting the display name for any type of component. This is helpful when creating a name for a higher order component using the name of the wrapped component.


### `onLoad(renderWhen, [LoadingComponent])`
Returns a higher order component (HOC) to handle conditional logic for loading states.

#### Arguments
###### renderWhen
+ `function(props)`: A function that returns true when the wrapped component may render. Will be passed the current props.
+ `<path>`: A string path to a value in the current props. When the value is present and not 'loading' the wrapped component will render.
+ `{ key1: <val1>, ... }`: An object where the keys are string paths to values in the current props and values are the required values of those props for the wrapped component to be render. All key-value pairs must be satisfied.

###### [LoadingComponent]
+ `Component`: A component to render during the loading state, will be passed the current props. If not provided, `<p>Loading...</p>` will be rendered.



### `onMount(onComponentDidMount)`
Returns a higher order component (HOC) that will invoke the provided function during the `componentDidMount` lifecycle event.

#### Arguments
###### onComponentDidMount
+ `function(props)`: A function to be invoked during the `componentDidMount` lifecycle event. Will be passed the current props.

### `selectorForSlice(slicePath)`
A Redux helper. Given the path of a certain state slice, it returns a function that can be used to create state selectors (helpful for `mapStateToProps()`).

Ex.
```
import { selectorForSlice } from 'lp-utils'

const state = {
  userSlice: {
    user: {
      name: 'test'
    }
  }
}

const select = selectorForSlice('userSlice')

// The resulting select() function has arguments (path, defaultValue)

const Selectors = {}
Selectors.user = select('user')
Selectors.username = select('user.name', 'defaultName')

export { Selectors }

// These selectors can be called in mapStateToProps() like so:
// Selectors.user(state) => { name: 'test' }
// Selectors.username(state) => 'test'

```

### `validate(constraints)`
A wrapper around the Validate.js `validate` method that returns `function(attributes)` to be used to validate an object provided by Redux Form. This handles transforming the constraints and results to work seamlessly with Redux Form even for nested data.

Ex.
Note: this example is meant to demonstrate the usage of `validate` it is NOT a complete example of using Redux Form.
```
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, FormSection, reduxForm } from 'redux-form'
import { validate } from 'lp-utils'
// ... other imports

/*
 * Note the format for nested constraints
 */
const CONSTRAINTS = {
  'user.email': { presence: true, email: true },
  'user.password': { presence: true },
}

// In your Component
function YourComponent({ ... }) {

...

return (
  ...   

  <form onSubmit={ handleSubmit }>

    {/* FormSection will nest the attributes under the 'name' */}

    <FormSection name="user">
      <Field name="email" component={ Input }/>
      <Field name="password" component={ Input } type="password"/>
    </FormSection>

    ...
  </form>
)

export default compose(
  connect(...),
  reduxForm({
    ...
    validate: validate(CONSTRAINTS),
  }),
)(YourComponent)
```
