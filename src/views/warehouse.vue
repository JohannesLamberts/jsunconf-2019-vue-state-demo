<template>
  <div>
    <v-layout column>
      <v-flex>
        <v-card class="ma-2 pa-3">
          <api-mode />
        </v-card>
      </v-flex>
      <v-flex>
        <v-card class="ma-2">
          <v-card-title primary-title class="headline">
            Warehouse: {{Warehouse.items.length}} items
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card class="ma-2">
          <example-warehouse-list />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ExampleWarehouseList from '@/components/warehouse-list'
import ApiMode from '@/components/api-mode'
import Warehouse from '@/models/warehouse-advanced'

export default {
  name: 'ExampleWarehouse',
  components: {
    ApiMode,
    ExampleWarehouseList,
  },
  models: {
    Warehouse,
  },
}

</script>
