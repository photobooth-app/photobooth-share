<template>
  <div id="media-container">
    <!-- LOADING -->
    <div v-if="!loadingDone">
      <div class="absolute-full flex flex-center column q-gutter-y-lg">
        <div>
          <q-spinner size="6em" color="primary" />
        </div>
        <div>{{ $t('Loading your file. Please wait.') }}</div>
      </div>
    </div>

    <!-- IMAGE -->
    <transition v-if="props.mediaType === MediaTypes.image" appear enter-active-class="animated fadeIn">
      <img
        v-show="loadingDone"
        :src="props.url.toString()"
        id="img-media-content"
        class="media-content"
        @error="onMediaContentLoadingErrored"
        @load="onMediaContentLoadingFinished"
      />
    </transition>

    <!-- VIDEO-->
    <transition v-else-if="props.mediaType === MediaTypes.video" appear enter-active-class="animated fadeIn">
      <video
        v-show="loadingDone"
        :src="props.url.toString()"
        class="media-content"
        muted
        autoplay
        loop
        playsinline
        controls
        controlslist="noremoteplayback noplaybackrate"
        disablepictureinpicture
        @error="onMediaContentLoadingErrored"
        @loadeddata="onMediaContentLoadingFinished"
      ></video>
    </transition>

    <!-- UNSUPPORTED FILE TYPE! -->
    <div v-else>unknown file type, not supported</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MediaTypes } from 'src/models/types'

interface Props {
  url: URL
  mediaType: MediaTypes
}

const props = withDefaults(defineProps<Props>(), {
  // url: () => ""
  // mediaType: () => ""
})

const loadingDone = ref(false)
const loadingErrored = ref(false)

function onMediaContentLoadingFinished() {
  console.log('finished')
  loadingDone.value = true
}
function onMediaContentLoadingErrored() {
  console.log('errored')
  loadingErrored.value = true
}
</script>

<style lang="css">
#img-media-content {
  /* border-radius: 10px; */
}
#video-media-content {
  /*TODO*/
}
#media-container {
  height: 100%;
}
.media-content {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}
</style>
