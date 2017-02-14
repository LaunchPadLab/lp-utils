# LP Components


## Api
---

### `getDisplayName(Component)`
A helper method for getting the display name for any type of component. This is helpful when creating a name for a higher order component using the name of the wrapped component.

### `onMount(onComponentDidMount)`
Returns a higher order component (HOC) that will invoke the provided function during the `componentDidMount` lifecycle event.

#### Arguments
###### onComponentDidMount
+ `function(props)`: A function to be invoked during the `componentDidMount` lifecycle event. Will be passed the current props.

### `onUpdate(onComponentDidUpdate)`
Returns a higher order component (HOC) that will invoke the provided function during the `componentDidUpdate` lifecycle event.

#### Arguments
###### onComponentDidUpdate
+ `function(props, prevProps)`: A function to be invoked during the `componentDidUpdate` lifecycle event. Will be passed the current props and the previous props.

### `onLoad(renderWhen, [LoadingComponent])`
Returns a higher order component (HOC) to handle conditional logic for loading states.

#### Arguments
###### renderWhen
+ `function(props)`: A function that returns true when the wrapped component may render. Will be passed the current props.
+ `<path>`: A string path to a value in the current props. When the value is 'loading' the wrapped component will render.

###### [LoadingComponent]
+ `Component`: A component to render during the loading state, will be passed the current props. If not provided, `<p>Loading...</p>` will be rendered.

### `toggle(toggleName1, [toggleName2, ...])`
Returns a higher order component (HOC) that will provide a toggle value and toggle function to the wrapped component.

#### Arguments
##### toggles
+ `<string>, [<string, ...]`: One to many toggle names. For each toggle name, the wrapped component will receive the following props:
 + `<toggleName>Active`: a boolean with the current state of the toggle, default = false.
 + `toggle<ToggleName>`: a function that will toggle the toggle!

#### Arguments
###### onComponentDidMount
+ `function(props)`: A function to be invoked during the `componentDidMount` lifecycle event. Will be passed the current props.

### `validate(constraints)`
A wrapper around the Validate.js `validate` method that returns `function(attributes)` to be used to validate an object provided by Redux Form.
