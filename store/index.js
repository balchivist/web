export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('families/getAllFamilies')
  },
}
