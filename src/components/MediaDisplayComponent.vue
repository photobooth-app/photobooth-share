<template>
  <div id="media-container">
    <!-- ERROR DURING LOADING-->
    <div v-if="loadingErrored">
      <div class="absolute-full flex flex-center text-white">
        Failed to load the item! Try again -> Refresh the page.
      </div>
    </div>

    <!-- DISPLAY MEDIA -->
    <div class="full-height items-center" v-else>
      <!-- LOADING PLACEHOLDER -->
      <div v-if="!loadingDone">
        <div class="absolute-full flex flex-center text-white">Loading img. Please wait.</div>
      </div>
      <!-- IMAGE -->
      <img
        v-if="mediatypeIsImage"
        v-show="loadingDone"
        :src="props.url.toString()"
        id="img-media-content"
        class="media-content"
        @error="onMediaContentLoadingErrored"
        @load="onMediaContentLoadingFinished"
      />

      <!-- VIDEO-->
      <video
        v-else
        v-show="loadingDone"
        :src="`/media/preview/${'nothingyet'}`"
        class="media-content"
        muted
        autoplay
        loop
        playsinline
        controls
        controlslist="nofullscreen nodownload noremoteplayback noplaybackrate"
        disablepictureinpicture
        @error="onMediaContentLoadingErrored"
        @load="onMediaContentLoadingFinished"
      ></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  url: URL;
}

const props = withDefaults(defineProps<Props>(), {
  // todos: () => []
});

const loadingDone = ref(false);
const loadingErrored = ref(false);

function onMediaContentLoadingFinished() {
  console.log('finished');
  loadingDone.value = true;
}
function onMediaContentLoadingErrored() {
  console.log('errored');
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
