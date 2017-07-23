export default function create (namespace, initial = {}) {
  if (!namespace) {
    throw new TypeError('No namespace provided for the tree-store 💣')
  }

  var types = {
    SET: `${namespace}:SET`,
    SET_KEY: `${namespace}:SET_KEY`
  }

  var state = {
    tree: initial
  }

  var mutations = {
    [types.SET] (state, tree) {
      state.tree = tree
    },
    [types.SET_KEY] (state, [key, value]) {
      state.tree[key] = value
    }
  }

  var getters = {
    [namespace]: state => state.tree
  }

  return {
    types,
    state,
    mutations,
    getters
  }
}
