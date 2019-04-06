export const sleep = (time = 500) => new Promise(resolve => setTimeout(resolve, time))
export const id = () => Math.random().toString(16).substr(2)

export default {

  name: 'DataApi',

  data() {
    return {
      mode: 200,
      modes: [200, 404, 409, 500],
    }
  },

  methods: {
    setMode(mode) {
      this.mode = mode
    },
    async fetch() {
      await sleep()
      return [
        {
          id: id(),
          version: 1,
          label: 'Vue',
          count: 5,
        },
        {
          id: id(),
          version: 1,
          label: 'State',
          count: 7,
        },
        {
          id: id(),
          version: 1,
          label: 'Management',
          count: 1,
        },
      ]
    },

    async sync(item) {
      await sleep(Math.random() * 500)

      switch (this.mode) {
        case 404: {
          this.setMode(200)
          const e = new Error('Not found')
          e.status = 404
          e.version = null
          e.count = 0
          throw e
        }
        case 409: {
          this.setMode(200)
          const e = new Error('Remotely changed')
          e.status = 409
          e.version = item.version + 3
          e.count = 900
          throw e
        }
        case 500: {
          this.setMode(200)
          const e = new Error('Server error')
          e.status = 500
          throw e
        }
        default:
      }
    },
  },
}
