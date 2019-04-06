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

  computed: {
    itemsById() {
      return new Map(this.items.map(item => ([item.id, item])))
    },
  },

  methods: {
    async fetch() {
      this.saveItems(await this.DataApi.fetch())
    },
    saveItems(items) {
      this.items = items
    },
    incoming(id) {
      this.updateItemCount(id, 1)
    },
    outgoing(id) {
      this.updateItemCount(id, -1)
    },
    updateItemCount(id, mod) {
      const item = this.itemsById.get(id)
      if ((item.count + mod) < 0) {
        throw new Error('Nothing more to give')
      }
      item.count += mod
    },
  },
}
