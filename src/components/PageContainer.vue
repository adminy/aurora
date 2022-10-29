<template>
  <div class="flex flex-col">
    <div class="post-header">
      <h1 v-if="post.title" class="post-title text-white uppercase">
        {{ pageTitle }}
        <!-- {{ editLink }} -->
      </h1>
      <ob-skeleton
        v-else
        class="post-title text-white uppercase"
        width="100%"
        height="clamp(1.2rem, calc(1rem + 3.5vw), 4rem)"
      />
    </div>
    <div class="main-grid">
      <div class="relative">
        <div
          v-if="post.content"
          class="post-html"
          v-html="post.content"
          v-scroll-spy="{ sectionSelector: 'h1, h2, h3, h4, h5, h6' }"
        />
        <div
          v-else
          class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block min-h-screen"
        >
          <ob-skeleton
            tag="div"
            :count="1"
            height="36px"
            width="150px"
            class="mb-6"
          />
          <br />
          <ob-skeleton
            tag="div"
            :count="35"
            height="16px"
            width="100px"
            class="mr-2"
          />
          <br />
          <br />
          <ob-skeleton
            tag="div"
            :count="25"
            height="16px"
            width="100px"
            class="mr-2"
          />
        </div>
        <slot />
        <Comment
          :title="pageData.title"
          :body="pageData.text"
          :uid="pageData.uid"
        />
      </div>
      <div class="col-span-1">
        <Sidebar>
          <Profile :author="blogAuthor" />
          <Toc :toc="post.toc" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onBeforeMount,
  toRefs,
  watch,
  ref
} from 'vue'
import { useI18n } from 'vue-i18n'
import { Sidebar, Toc, Profile } from '@/components/Sidebar'
import { useCommonStore } from '@/stores/common'
import { useAppStore } from '@/stores/app'
import Comment from '@/components/Comment.vue'
import { Page } from '@/models/Article.class'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/article'
import { useMetaStore } from '@/stores/meta'

export default defineComponent({
  name: 'ObPageContainer',
  components: { Sidebar, Toc, Profile, Comment },
  props: {
    post: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const commonStore = useCommonStore()
    const { t } = useI18n()
    const post = toRefs(props).post
    const title = toRefs(props).title
    const appStore = useAppStore()
    const pageData = ref(new Page())
    const route = useRoute()
    const articleStore = useArticleStore()
    const pageTitle = ref()
    const metaStore = useMetaStore()

    const fetchArticle = () => {
      articleStore.fetchArticle(String(route.params.slug)).then(response => {
        pageData.value = response

        pageTitle.value = pageData.value.title

        updateTitle(appStore.locale)
      })
    }

    const updateTitle = (locale: string | undefined) => {
      const currentLocale = locale === 'cn' ? 'cn' : 'en'
      const routeInfo =
        appStore.themeConfig.menu.menus[String(route.params.slug)]
      pageTitle.value =
        (routeInfo.i18n && routeInfo.i18n[currentLocale]) || routeInfo.name
      metaStore.setTitle(pageTitle.value)
    }

    watch(
      () => post.value.covers,
      value => {
        console.log(value)
        if (value) commonStore.setHeaderImage(value)
      }
    )

    onMounted(() => {
      commonStore.setHeaderImage(post.value.covers)
    })

    onUnmounted(() => {
      commonStore.resetHeaderImage()
    })

    onBeforeMount(fetchArticle)

    return {
      pageTitle: computed(() => {
        if (title.value !== '') return title.value
        return post.value.title
      }),
      blogAuthor: computed(() => appStore.hexoConfig.site.author),
      pageData,
      // editLink: computed(() => {
      //   return 'bla bla bla'
      //   // if (!appStore.themeConfig.theme.postEdit.enable) return ''
      //   // return `<a href="${
      //   //   appStore.themeConfig.theme.postEdit.url + post.value.link
      //   // } class="post-edit-link" title="Edit ${
      //   //   post.value.title
      //   // }" target="_blank"><i class="fa fa-pen-nib"></i></a>`
      // }),
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.post-title {
  @apply my-2;
  font-size: clamp(1.2rem, calc(1rem + 3.5vw), 4rem);
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
}
.post-stats {
  @apply w-full flex flex-row text-sm lg:text-base mb-6;
  span {
    @apply text-white stroke-current flex flex-row items-center pr-4;
  }
}
// .post-edit-link {
//   border-bottom: 0;
//   color: #bbb;
//   display: inline-block;
//   float: right;
//   font-size: 1.25em;
//   margin-left: -1.2em;
//   transition: color 0.2s ease-in;
//   // +mobile-small() {
//   //   margin-left: initial;
//   // }

//   // &:hover {
//   //   color: $sidebar-highlight;
//   // }
// }

// if (hexo-config('post_edit.enable')) {

// }
</style>
