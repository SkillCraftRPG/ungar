<template>
  <div>
    <h2 v-show="maps.length" class="h3">{{ $t("maps.title") }}</h2>
    <MapView v-for="map in maps" :key="map.id" :map="map" />
  </div>
</template>

<script setup lang="ts">
import type { Article, MapContent } from "~/types/encyclopedia";
import type { SearchResults } from "~/types/search";

const config = useRuntimeConfig();

const props = defineProps<{
  article?: Article;
}>();

const { data } = await useAsyncData<SearchResults<MapContent>>(
  props.article ? `article:${props.article.id}:maps` : "maps",
  () =>
    $fetch(`/api/maps`, {
      baseURL: config.public.apiBaseUrl,
      query: { article: props.article?.id },
    }),
  { watch: [() => props.article] },
);
const maps = computed<MapContent[]>(() => data.value?.items ?? []);
</script>
