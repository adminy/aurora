<template>
  <div
    class="bg-ob-deep-800 p-4 mt-8 lg:px-14 lg:py-10 rounded-2xl shadow-xl mb-8 lg:mb-0"
  >
    <SubTitle :title="'titles.comment'" />
    <giscus-widget
      id="comments"
      :repo="giscusProps.repo"
      :repoId="giscusProps.repoId"
      :category="giscusProps.category"
      :categoryId="giscusProps.categoryId"
      :mapping="giscusProps.mapping"
      :reactionsEnabled="giscusProps.reactionsEnabled"
      :emitMetadata="giscusProps.emitMetadata"
      v-bind:theme="theme"
      :lang="giscusProps.lang"
      :crossorigin="giscusProps.crossorigin"
      :inputPosition="giscusProps.inputPosition"
      :loading="giscusProps.loading"
    />
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { defineComponent, onMounted, toRefs, watch, computed } from 'vue'
import { SubTitle } from '@/components/Title'
import { usePostStore } from '@/stores/post'
import 'giscus'

export default defineComponent({
  name: 'ObComment',
  props: {
    /** Used for create issue title by giscus */
    title: {
      type: String,
      default: ''
    },
    /** Used for create issue body content by giscus */
    body: {
      type: String,
      default: ''
    },
    /** Unique ID used by giscus */
    uid: {
      type: String,
      default: ''
    }
  },
  components: { SubTitle },
  setup(props) {
    const postTitle = toRefs(props).title
    const postBody = toRefs(props).body
    const postUid = toRefs(props).uid
    const appStore = useAppStore()
    const postStore = usePostStore()

    const enabledComment = (
      postTitle: string,
      postBody: string,
      postUid: string
    ) => {
      /**
       * Generate the data needed for giscus to generate the issue.
       */
      // const title = !postTitle || postTitle === '' ? '' : postTitle
      // const body =
      //   !postBody || postBody === ''
      //     ? window.location.href
      //     : `${window.location.href} \n ${postBody}`

      // const uid =
      //   appStore.themeConfig.plugins.giscus.id === 'pathname'
      //     ? window.location.pathname
      //     : postUid

      /**
       * Caching the current post data, used
       * when config changes on render updates.
       */
      postStore.setCache({
        title: postTitle,
        body: postBody,
        uid: postUid
      })

      if (!appStore.configReady) return
    }

    /** Wait for config is ready */
    watch(
      () => appStore.configReady,
      (newValue, oldValue) => {
        if (!oldValue && newValue) {
          const cachePost = postStore.cachePost
          enabledComment(cachePost.title, cachePost.body, cachePost.uid)
        }
      }
    )

    onMounted(() => {
      enabledComment(postTitle.value, postBody.value, postUid.value)
    })

    return {
      giscusProps: computed(() => ({
        ...appStore.themeConfig.plugins.giscus
      })),
      theme: computed(() =>
        appStore.theme === 'theme-dark' ? 'dark' : 'light'
      )
    }
  }
})
</script>
