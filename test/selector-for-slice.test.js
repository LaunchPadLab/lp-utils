import { selectorForSlice } from '../src/'

const state = {
  userSlice: {
    user: {
      name: 'test'
    }
  }
}

const select = selectorForSlice('userSlice')

const Selectors = {}
Selectors.user = select('user')
Selectors.username = select('user.name')
Selectors.withDefault = select('other', 'default')
Selectors.withNoDefault = select('other')
Selectors.withUndefined = select(undefined)

test('select returns correct value', () => {
  expect(Selectors.user(state)).toEqual({ name: 'test'})
})

test('select nested key returns correct value', () => {
  expect(Selectors.username(state)).toEqual('test')
})

test('select missing key with default returns default', () => {
  expect(Selectors.withDefault(state)).toEqual('default')
})

test('select missing key with no default returns null', () => {
  expect(Selectors.withNoDefault(state)).toEqual(null)
})

test('select undefined path returns null', () => {
  expect(Selectors.withUndefined(state)).toEqual(null)
})