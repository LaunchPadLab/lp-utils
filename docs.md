<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [flatToNested](#flattonested)
-   [nestedToFlat](#nestedtoflat)

## flatToNested

Returns an object where the keys are converted from string paths to nested objects.  This is the opposite of [nestedToFlat](#nestedtoflat).

**Parameters**

-   `obj` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object of key-value pairs where the keys are strings of the form `part1[.part2, ...]`

**Examples**

```javascript
const flatObj = {
  'foo.bar.baz': 'hello',
  space: 'world'
}

flatToNested(flatObj)

// {
//   foo: {
//     bar: {
//       baz: 'hello'
//     }
//   },
//   space: 'world'
// }
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** A potentially nested object

## nestedToFlat

Returns an object where the keys are string paths converted from nested objects. This is the opposite of [flatToNested](#flattonested).

**Parameters**

-   `obj` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** A nested object
-   `prefix` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** A string prefix to prepend to the keys of root object, typically only used internally.

**Examples**

```javascript
const nestedObj = {
  foo: {
    bar: {
      baz: 'hello'
    }
  },
  space: 'world'
}

nestedToFlat(nestedObj)

// {
//   'foo.bar.baz': 'hello',
// }
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object of key-value pairs where the keys are strings of the form `part1[.part2, ...]`