import flatToNested from '../src/flat-to-nested'
import nestedToFlat from '../src/nested-to-flat'

test('deep', () => {
  const obj = {
    foo: 'bar',
    'baz.ryan.dave': 9,
    'baz.dave': 'ryan',
    'baz.ifat': ['foo', 'bar'],
  }

  expect(flatToNested(obj)).toEqual({
    foo: 'bar',
    baz: {
      ryan: {
        dave: 9,
      },
      dave: 'ryan',
      ifat: [
        'foo', 'bar',
      ],
    },
  })
})

test('reciprocal', () => {
  const obj = {
    foo: 'bar',
    'baz.ryan.dave': 9,
    'baz.dave': 'ryan',
    'baz.ifat': ['foo', 'bar'],
  }

  expect(nestedToFlat(flatToNested(obj))).toEqual(obj)
})
