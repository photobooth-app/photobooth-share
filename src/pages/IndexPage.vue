<template>
  <q-page class="fullscreen">
    <!-- valid url -->
    <div v-if="validatedUrl" class="full-height column items-center no-wrap q-gutter-y-sm">
      <div class="text-h3">
        {{ $t("Save or share what you've captured") }}
      </div>

      <MediaDisplayComponent class="col-shrink" :url="validatedUrl"></MediaDisplayComponent>

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

    <!-- else: illegal url -->
    <div v-else>
      <!-- this text is only displayed if during validation the requested URL fails -->
      <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
        <div>
          <div style="font-size: 150px">😵‍💫</div>
          <div class="text-h3" style="opacity: 0.5">Oops. That did not work out well...</div>
          <div class="text-h5" style="opacity: 0.5">If you think this is wrong, try again.</div>
          <div class="q-mt-md" style="opacity: 0.5">
            <p>
              {{ $t('For security reasons, the requested URL needs to be on the same host!') }}
              <br />
              {{
                $t(
                  'The requested URL "{requestedUrl}" must be relative or absolute but same hostname as this page "{requiredUrl}".',
                  {
                    requestedUrl: props.url ? props.url : '- - empty - -',
                    requiredUrl: windowLocationHostname,
                  },
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MediaDisplayComponent from 'src/components/MediaDisplayComponent.vue';

const windowLocationHostname = window.location.hostname;
interface Props {
  url: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  url: null,
});

function shareContent() {
  console.log('hey');
}

const validatedUrl = computed<URL | null>(() => {
  if (props.url) {
    try {
      const givenUrl = new URL(props.url, window.location.href); //https://nodejs.org/api/url.html#the-whatwg-url-api
      // givenUrl is the parsed prop.url if absolute (base is ignored in this case.)
      // for relative props.url, the current window location is added.
      // means in the result, when comparing the hostname of window.location and givenUrl, if different its not local and then rejected.
      if (givenUrl.hostname === window.location.hostname) {
        return givenUrl;
      }
    } catch (e) {
      console.warn(e);
    }
  }
  return null;
});

const isHttps = computed(() => {
  // return true;
  return window.location.protocol === 'https:';
});
</script>
