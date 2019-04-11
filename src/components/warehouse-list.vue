<template>
  <v-list two-line>
    <v-list-tile
      v-for="item of Warehouse.items"
      :key="item.id"
    >
      <v-list-tile-title>
        {{item.count}} x {{item.label}}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        #{{item.id}}@v{{item.version}}
      </v-list-tile-sub-title>
      <v-list-tile-action>
        <v-btn
          icon
          @click="() => null"
        >
          <v-icon>remove</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-action>
        <v-btn
          icon
          @click="() => null"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'ExampleWarehouseList',
  data() {
    return {
      Warehouse: {
        items: [],
      },
    }
  },
}
</script>
