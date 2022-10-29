<template>
  <div class="flex flex-col">
    <div class="post-header">
      <Breadcrumbs :current="t('menu.tags')" />
      <h1 class="post-title text-white uppercase">{{ t('menu.tags') }}</h1>
    </div>
    <div class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block">
      <TagList>
        <template v-if="tags && tags.length > 0">
          <TagItem
            v-for="tag in tags"
            :key="tag.slug"
            :name="tag.name"
            :slug="tag.slug"
            :count="tag.count"
            size="xl"
          />
        </template>
        <template v-else-if="tags">
          <ob-skeleton tag="li" :count="10" height="20px" width="3rem" />
        </template>
        <template v-else>
          <div class="flex flex-row justify-center items-center">
            <svg-icon class="stroke-ob-bright mr-2" icon-class="warning" />
            {{ t('settings.empty-tag') }}
          </div>
        </template>
      </TagList>
    </div>
    <Comment
      :title="pageData.title"
      :body="pageData.text"
      :uid="pageData.uid"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onUnmounted, ref } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useI18n } from 'vue-i18n'
import { useTagStore } from '@/stores/tag'
import { TagList, TagItem } from '@/components/Tag'
import { useCommonStore } from '@/stores/common'
import Comment from '@/components/Comment.vue'
import { Page } from '@/models/Article.class'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/article'
import { useAppStore } from '@/stores/app'

export default defineComponent({
  name: 'Tag',
  components: { Breadcrumbs, TagList, TagItem, Comment },
  setup() {
    const commonStore = useCommonStore()
    const { t } = useI18n()
    const tagStore = useTagStore()
    const appStore = useAppStore()
    const pageData = ref(new Page())
    const route = useRoute()
    const articleStore = useArticleStore()

    const fetchArticle = () => {
      articleStore.fetchArticle(String(route.params.slug)).then(response => {
        pageData.value = response
      })
    }

    const fetchData = async () => {
      fetchArticle()
      tagStore.fetchAllTags()
      commonStore.setHeaderImage(`${require('@/assets/default-cover.jpg')}`)
    }

    onBeforeMount(fetchData)
    onUnmounted(() => {
      commonStore.resetHeaderImage()
    })

    return {
      tags: computed(() => {
        if (tagStore.isLoaded && tagStore.tags.length === 0) return null
        return tagStore.tags
      }),
      pageTitle: computed(() => ''),
      blogAuthor: computed(() => appStore.hexoConfig.site.author),
      pageData,
      t
    }
  }
})
</script>

<style lang="scss" scoped></style>
