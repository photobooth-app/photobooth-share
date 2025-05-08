<template>
  <q-page class="fullscreen">
    <div class="full-height column items-center no-wrap q-gutter-y-sm">
      <div class="">
        <p>Download ya shoot</p>
      </div>

      <MediaDisplayComponent
        class="col-shrink"
        url="http://localhost:8000/media/preview/a9482fe5-1ea7-4e1b-b8e6-8af97a590ccb"
      ></MediaDisplayComponent>

      <div class="button-container q-gutter-x-md">
        <q-btn class="btn-download" icon="download" color="primary" size="lg" flat />
        <q-btn
          v-if="isHttps"
          size="lg"
          flat
          class="btn-share"
          icon="share"
          @click="shareContent()"
          color="primary"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MediaDisplayComponent from 'src/components/MediaDisplayComponent.vue';

function shareContent() {
  console.log('hey');
}

const isHttps = computed(() => {
  // return true;
  return window.location.protocol === 'https:';
});
</script>
