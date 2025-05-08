<template>
  <div class="full-height items-center" id="media-container">
    <!-- ERROR DURING LOADING-->
    <div v-if="loadingErrored">
      <div class="absolute-full flex flex-center text-white">
        Failed to load the item! Try again -> Refresh the page.
      </div>
    </div>

    <!-- DISPLAY MEDIA -->
    <div v-else>
      <!-- IMAGE -->
      <img
        v-if="mediatypeIsImage"
        :src="props.url"
        id="img-media-content"
        class="media-content"
        @error="onMediaContentLoadingErrored"
      />

      <!-- VIDEO-->
      <video
        v-else
        :src="`/media/preview/${'nothingyet'}`"
        class="media-content"
        muted
        autoplay
        loop
        playsinline
        controls
        controlslist="nofullscreen nodownload noremoteplayback noplaybackrate"
        disablepictureinpicture
      ></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  url: string;
}

const props = withDefaults(defineProps<Props>(), {
  // todos: () => []
});

const loadingErrored = ref(false);
function onMediaContentLoadingErrored() {
  loadingErrored.value = true;
}

const mediatypeIsImage = computed(() => true);
</script>
<style lang="css">
#img-media-content {
  /* border-radius: 10px; */
}
#video-media-content {
  /*TODO*/
}
.media-content {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}
</style>
