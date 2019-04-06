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
    totalItems() {
      return this.items.reduce((acc, el) => acc + el.count, 0)
    },
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
    async incoming(id) {
      await this.updateItemCount(id, 1)
    },
    async outgoing(id) {
      await this.updateItemCount(id, -1)
    },
    async updateItemCount(id, mod) {
      const item = this.itemsById.get(id)

      if (!item) {
        throw new Error(`Item with id ${id} not found`)
      }

      if ((item.count + mod) < 0) {
        throw new Error('No more items to give away')
      }

      item.count += mod
      await this.syncSafe(item, () => this.updateItemCount(id, mod))
    },
    removeItemFromRemote(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    updateItemFromRemote(id, { version, count }) {
      const item = this.itemsById.get(id)

      if (!item) {
        throw new Error(`Item with id ${id} not found`)
      }

      item.version = version
      item.count = count
    },
    async syncSafe(item, onItemReset) {
      try {
        await this.syncUnSafe(item)
      } catch (e) {
        switch (e.status) {
          case 404:
            this.removeItemFromRemote(item.id)
            break
          case 409:
            this.updateItemFromRemote(item.id, e)
            await onItemReset()
            break
          default:
            throw e
        }
      }
    },
    async syncUnSafe(item) {
      /* eslint-disable-next-line no-param-reassign */
      item.version += 1
      await this.DataApi.sync(item)
    },
  },
}
