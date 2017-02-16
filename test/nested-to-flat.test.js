import nestedToFlat from '../src/nested-to-flat'
import flatToNested from '../src/flat-to-nested'

test('1 level', () => {
  const obj = { foo: 'bar' }
  expect(nestedToFlat(obj)).toEqual(obj)
})

test('deep', () => {
  const obj = {
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
  }

  expect(nestedToFlat(obj)).toEqual({
    foo: 'bar',
    'baz.ryan.dave': 9,
    'baz.dave': 'ryan',
    'baz.ifat': ['foo', 'bar'],
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
