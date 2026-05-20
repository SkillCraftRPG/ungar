<template>
  <div>
    <h3 class="h5">{{ map.title }}</h3>
    <div :id="id" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import L from "leaflet";

import type { MapContent } from "~/types/encyclopedia";

const props = defineProps<{
  map: MapContent;
}>();

const id = computed<string>(() => `map-${props.map.id}`);

watch(
  () => props.map,
  (data) =>
    setTimeout(() => {
      const map: L.Map = L.map(id.value, { crs: L.CRS.Simple, minZoom: -3 });
      const bounds: L.LatLngBoundsExpression = [
        [0, 0],
        [data.height, data.width],
      ];
      L.imageOverlay(data.source, bounds, { alt: `${data.title}’s Map` }).addTo(map);
      map.fitBounds(bounds);
    }, 1),
  { deep: true, immediate: true },
);
</script>

<style scoped>
.map {
  height: 720px;
}
</style>
