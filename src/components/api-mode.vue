<template>
  <v-select
    :value="DataApi.mode"
    :items="DataApi.modes"
    label="Modus"
    @change="mode => DataApi.setMode(mode)"
  />
</template>

<script>
export default {
  name: 'ApiMode',
  injectModels: ['DataApi'],
}
</script>
