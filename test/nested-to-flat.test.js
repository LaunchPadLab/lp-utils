import test from 'ava'
import nestedToFlat from '../src/nested-to-flat'
import flatToNested from '../src/flat-to-nested'

test('1 level', t => {
  const obj = { foo: 'bar' }
  t.deepEqual(nestedToFlat(obj), obj)
})

test('deep', t => {
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

  t.deepEqual(nestedToFlat(obj), {
    foo: 'bar',
    'baz.ryan.dave': 9,
    'baz.dave': 'ryan',
    'baz.ifat': ['foo', 'bar'],
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
