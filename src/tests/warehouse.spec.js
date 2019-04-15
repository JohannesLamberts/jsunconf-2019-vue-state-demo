import { createLocalVue } from '@vue/test-utils'
import StatePlugin from '@/plugins/state'
import WarehouseModel from '@/models/warehouse'
import DataApiModel from '@/models/dataApi'
import { serializeHistory } from '@/tests/vue-history-testing'

const Vue = createLocalVue()
Vue.use(StatePlugin)

describe('Warehouse', () => {
  let vm
  let Warehouse
  let DataApi

  beforeEach(async () => {
    vm = new Vue({
      models: {
        DataApi: DataApiModel,
        Warehouse: WarehouseModel,
      },
    })

    /* eslint-disable-next-line prefer-destructuring */
    DataApi = vm.DataApi
    /* eslint-disable-next-line prefer-destructuring */
    Warehouse = vm.Warehouse

    // wait for warehouse fetch to be done
    await Promise.all(vm.$globalHistory.items.map(item => item.promise))

    Warehouse.saveItems([
      {
        id: 'mocked',
        version: 2,
        count: 3,
      },
    ])

    // clear initial history
    vm.$globalHistory.items = []
  })

  it('should should synchronize items with external database', async () => {
    DataApi.setMode(200)
    await Warehouse.incoming(Warehouse.items[0].id)
    expect(serializeHistory(vm.$globalHistory))
      .toMatchSnapshot()
  })

  it('should synchronize and redo after remote change', async () => {
    DataApi.setMode(409)
    await Warehouse.incoming(Warehouse.items[0].id)
    expect(serializeHistory(vm.$globalHistory))
      .toMatchSnapshot()
  })

  it('should synchronize remotely removed items', async () => {
    DataApi.setMode(404)
    await Warehouse.incoming(Warehouse.items[0].id)
    expect(serializeHistory(vm.$globalHistory))
      .toMatchSnapshot()
  })
})
