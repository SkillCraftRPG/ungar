<template>
  <div>
    <h3 class="h5">{{ map.title }}</h3>
    <div :id="id" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import L from "leaflet";
import { marked } from "marked";

import type { MapContent } from "~/types/encyclopedia";

const props = defineProps<{
  map: MapContent;
}>();

const id = computed<string>(() => `map-${props.map.id}`);

watch(
  () => props.map,
  (map) =>
    setTimeout(() => {
      const leafMap: L.Map = L.map(id.value, {
        crs: L.CRS.Simple,
        minZoom: -3,
      });
      const bounds: L.LatLngBoundsExpression = [
        [0, 0],
        [map.height, map.width],
      ];
      L.imageOverlay(map.source, bounds, { alt: `${map.title}’s Map` }).addTo(leafMap);
      leafMap.fitBounds(bounds);

      map.markers.forEach((marker) => {
        const leafMarker: L.Marker = L.marker([map.height - marker.y, marker.x], {
          title: marker.title,
          alt: `${marker.title}’s Marker`,
        }).addTo(leafMap);
        if (marker.htmlContent) {
          leafMarker.bindPopup(marked.parse(marker.htmlContent) as string);
        }
      });
    }, 1),
  { deep: true, immediate: true },
);
</script>

<style scoped>
.map {
  height: 720px;
}
</style>
