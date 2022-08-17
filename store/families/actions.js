export default {
  async getAllFamilies({ commit }) {
    const { data } = await this.$axios.$get('/api/v1/families/')
    commit('initialize', data)
  },
}
