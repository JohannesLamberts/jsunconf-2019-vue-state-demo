<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Demo Time</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="(route, index) of routes"
        :key="index"
        :to="route.to"
        exact
        flat
      >
        <span class="mr-2">{{route.label}}</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DataApi from '@/models/dataApi'

export default {
  data() {
    return {
      routes: [
        {
          to: { name: 'index' },
          label: 'Index',
        },
        {
          to: { name: 'warehouse' },
          label: 'Warehouse',
        },
      ],
    }
  },
  models() {
    return {
      DataApi,
    }
  },
}
</script>
