<template>
  <q-page class="fullscreen">
    <!-- illegal url -->
    <div v-if="!validUrl">
      {{ $t('url invalid') }}
      {{ windowLocationHostname }} is not the same host as for the requested URL: "{{ props.url }}"
    </div>

    <!-- else -->
    <div class="full-height column items-center no-wrap q-gutter-y-sm" v-else>
      <div class="">
        <p>Download ya shoot URL: {{ props.url }}</p>
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
// import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import MediaDisplayComponent from 'src/components/MediaDisplayComponent.vue';
// const { t } = useI18n();

interface Props {
  url: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  url: null,
});

function shareContent() {
  console.log('hey');
}

const validUrl = computed(() => {
  if (props.url) {
    //todo: second check needed: is it on the same host?!

    try {
      console.log(window.location.href);
      const givenUrl = new URL(props.url, window.location.href);
      // givenUrl is the parsed prop.url if absolute (base is ignored in this case.)
      // for relative props.url, the current window location is added.
      // means in the result, when comparing the hostname of window.location and givenUrl, if different its not local and then rejected.

      console.log(givenUrl);
      console.log(window.location.hostname);
      return givenUrl.hostname === window.location.hostname;
    } catch (e) {
      console.error(e);
      return false; // Invalid URL
    }
  } else {
    return false;
  }
});

const isHttps = computed(() => {
  // return true;
  return window.location.protocol === 'https:';
});

const windowLocationHostname = computed(() => {
  return window.location.hostname;
});
</script>
