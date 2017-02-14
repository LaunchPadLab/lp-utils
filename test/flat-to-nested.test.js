import test from 'ava'
import flatToNested from '../src/flat-to-nested'
import nestedToFlat from '../src/nested-to-flat'

test('deep', t => {
  const obj = {
    foo: 'bar',
    'baz.ryan.dave': 9,
    'baz.dave': 'ryan',
    'baz.ifat': ['foo', 'bar'],
  }

  t.deepEqual(flatToNested(obj), {
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

test('reciprocal', t => {
  const obj = {
    foo: 'bar',
    'baz.ryan.dave': 9,
    'baz.dave': 'ryan',
    'baz.ifat': ['foo', 'bar'],
  }

  t.deepEqual(nestedToFlat(flatToNested(obj)), obj)
})
