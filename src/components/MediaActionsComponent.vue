<template>
  <!-- <div style="position: absolute; top: 60px; left: 10px">{{ isShareAvailable }} {{}}</div> -->

  <div class="button-container q-gutter-x-md">
    <q-btn class="btn-download" :icon="fasDownload" color="primary" size="xl" @click="doDownload" :label="$t('Download')" no-caps stack />
    <q-btn
      v-if="isShareAvailable"
      size="xl"
      class="btn-share"
      :icon="fasShareNodes"
      @click="doShare"
      color="primary"
      :label="$t('Share')"
      no-caps
      stack
    />
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { mimeToExtension } from 'src/models/types'
import { fasShareNodes } from '@quasar/extras/fontawesome-v6' //direct imports of icons instead embedding the whole font file
import { fasDownload } from '@quasar/extras/fontawesome-v6' //direct imports of icons instead embedding the whole font file
import { useQuasar } from 'quasar'
const $q = useQuasar()
const { t } = useI18n()

interface Props {
  url: URL
}

const props = withDefaults(defineProps<Props>(), {
  // url: () => ""
})

const isShareAvailable = computed(() => {
  return window.location.protocol === 'https:' && typeof navigator !== 'undefined' && typeof navigator.share === 'function'
})

function getExtensionFromContentType(contentType: string | null) {
  if (!contentType) return null
  return mimeToExtension[contentType.toLowerCase()] || null
}
function getExtensionFromFilename(filename: string) {
  if (!filename.includes('.') || filename.endsWith('.')) return ''
  return filename.slice(filename.lastIndexOf('.') + 1)
}

async function loadFile() {
  // load the file (again) with the fetch api when the buttons are clicked.

  // implement proper caching on server side so the client can just refetch
  // the image from internal cache instead loading from the server again
  const response = await fetch(props.url)
  const blob = await response.blob()
  const contentType = blob.type || null
  const filenameDerivedFromUrl = props.url.pathname.split('/').pop() || 'unknown'
  const fileextensionDerivedFromUrl = getExtensionFromFilename(filenameDerivedFromUrl)
  const fileextensionDerivedFromContentType = getExtensionFromContentType(contentType)

  let outFilename = null

  if (fileextensionDerivedFromUrl) {
    outFilename = filenameDerivedFromUrl
  } else if (fileextensionDerivedFromContentType) {
    outFilename = `${filenameDerivedFromUrl}.${fileextensionDerivedFromContentType}`
  }
  // alert(`filenameDerivedFromUrl=${filenameDerivedFromUrl}`);
  // alert(`fileextensionDerivedFromUrl=${fileextensionDerivedFromUrl}`);
  // alert(`fileextensionDerivedFromContentType=${fileextensionDerivedFromContentType}`);
  // alert(`contentType=${contentType}`);
  // alert(`outFilename=${outFilename}`);

  if (!outFilename) {
    throw new Error('cannot determine file type neither by file extension nor content type')
  }

  const file = new File([blob], outFilename, { type: contentType || 'application/octet-stream' })
  return file
}
async function doDownload() {
  $q.notify({
    message: t('Download started. Please wait until it finishes.'),
  })
  try {
    const file = await loadFile()

    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = file.name
    link.click()
    link.remove() // Clean up
  } catch (error) {
    console.error(error)
    $q.notify({
      message: t('Could not download the file. Please try again.'),
      caption: t('Error'),
      color: 'negative',
    })
  }
}
async function doShare() {
  let file
  if (window.location.protocol != 'https:') {
    $q.notify({
      message: t('The share functionality is only allowed for encrypted HTTPS hosts.'),
      caption: t('Error'),
      color: 'negative',
    })
    return
  }
  if (!navigator.share) {
    $q.notify({
      message: t('The share functionality is not supported by your browser.'),
      caption: t('Error'),
      color: 'negative',
    })
    return
  }

  try {
    file = await loadFile()
  } catch (error) {
    console.error(error)
    $q.notify({
      message: t('Could not download the file. Please try again.'),
      caption: t('Error'),
      color: 'negative',
    })
    return
  }

  const shareFile = {
    files: [file],
    title: 'Your photobooth shot',
    text: 'Check out this shot I took!',
  }
  const shareUrl = {
    url: props.url.toString(),
    title: 'Your photobooth shot',
    text: 'Check out this shot I took!',
  }

  if (navigator.canShare(shareFile)) {
    navigator
      .share(shareFile)
      .then(() => console.log('success'))
      .catch((error) => {
        // error is also if user aborts the process, so we just log to console but fail silently
        console.log('failed', error)
      })
  } else if (navigator.canShare(shareUrl)) {
    // Fallback to sharing without file (link only)
    navigator
      .share()
      .then(() => console.log('success'))
      .catch((error) => {
        // error is also if user aborts the process, so we just log to console but fail silently
        console.log('failed', error)
      })
  } else {
    $q.notify({
      message: t('This device does not support sharing files.'),
      caption: t('Error'),
      color: 'negative',
    })
  }
}
</script>
