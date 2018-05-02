export default function create (namespace, initial = {}) {
  if (!namespace) {
    throw new TypeError('No namespace provided for the tree-store 💣')
  }

  let types = {
    SET: `${namespace}:SET`,
    SET_KEY: `${namespace}:SET_KEY`
  }

  let state = {
    tree: initial
  }

  let mutations = {
    [types.SET] (state, tree) {
      state.tree = tree
    },
    [types.SET_KEY] (state, [key, value]) {
      state.tree[key] = value
    }
  }

  let getters = {
    [namespace]: state => state.tree
  }

  return {
    types,
    state,
    mutations,
    getters
  }
}
