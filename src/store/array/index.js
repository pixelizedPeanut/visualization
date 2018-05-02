export default function create (namespace, initial = []) {
  if (!namespace) {
    throw new TypeError('No namespace provided for the array-store 💣')
  }

  const types = {
    SET: `${namespace}:SET`,
    ADD: `${namespace}:ADD`,
    REPLACE: `${namespace}:REPLACE`
  }

  const state = {
    array: initial
  }

  const mutations = {
    [types.SET] (state, array) {
      state.array = [...array]
    },
    [types.ADD] (state, array) {
      state.array = state.array.concat(array)
    },
    [types.REPLACE] (state, [index, item]) {
      state.array.splice(index, 1, item)
    }
  }

  const getters = {
    [namespace]: state => state.array
  }

  return {
    types,
    state,
    mutations,
    getters
  }
}
