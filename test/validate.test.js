import validate from '../src/validate'

test('validates and transforms the data', () => {
  const data = {
    name: 'Foo',
    address: {
      zip: '12'
    }
  }

  const constraints = {
    name: {
      presence: true
    },
    'address.zip': {
      presence: true,
      length: { is: 5 }
    }
  }

  const results = validate(constraints)(data)
  expect(results).toEqual({
    address: {
      zip: ['Zip is the wrong length (should be 5 characters)']
    }
  })
})