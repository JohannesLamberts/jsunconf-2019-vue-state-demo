export default {
  injectModels: [
    'DataApi',
  ],

  data() {
    return {
      items: [],
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    async fetch() {
      this.saveItems(await this.DataApi.fetch())
    },
    saveItems(items) {
      this.items = items
    },
  },
}
