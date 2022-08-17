export default {
  getAllFamilies(state) {
    return state.families.map((res) => res.results)
  },
}
