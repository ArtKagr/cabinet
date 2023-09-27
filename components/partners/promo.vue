<template>
  <div class="partners-promo -page">
    <span class="partners-promo-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Промо-материалы кампании')" />
    <div class="d-flex w-100 mt-3" :class="windowWidthNumber < 1223 ? 'flex-column' : 'align-items-center'">
      <div class="partners-promo-campaign" :class="[windowWidthNumber < 1223 ? 'w-100 mb-3' : '', `-${dir}`]">
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center pb-1 pointer" @click="openCampaignList">
            <span class="partners-promo-campaign-title -primary" v-text="campaignTitle || 'Standard'" />
            <lfx-icon-chevron-down class="partners-promo-campaign-chevron" :class="`-${dir}`" />
          </div>
          <span class="partners-promo-campaign-description" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Кампания')" />
        </div>
        <div class="d-flex flex-column">
          <span class="partners-promo-campaign-title -type" v-text="campaignCard.type" />
          <span class="partners-promo-campaign-description" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Тип')" />
        </div>
      </div>
      <div class="partners-campaigns-link" :class="windowWidthNumber < 1223 ? 'w-100' : 'w-50'">
        <div class="d-flex flex-column">
          <span class="partners-campaigns-link-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Скопируйте эту реферальную ссылку, чтобы поделиться')" />
          <span
            class="partners-campaigns-link-text"
            :class="isRtlMode ? 'text-right' : ''"
            @click="openCampaignLink"
            v-text="campaignHref"
          />
        </div>
        <b-button variant="outline-primary" @click="copyRefLink" v-text="$t('Скопировать')" />
      </div>
    </div>
    <div class="partners-promo-data">
      <lfx-menu
        :menu="menu"
        :active-item="activeItem"
        source="promo"
        class="p-0"
        :class="windowWidthNumber < 1223 ? 'mb-3' : ''"
        no-margin-title
        no-route
        @click-handler="clickHandler"
      />
      <div class="d-flex flex-column">
        <span v-if="activeItem === 'banners'" :class="isRtlMode ? 'text-right' : ''" class="partners-promo-data-text" v-text="$t('Если часть баннеров не отображается, попробуйте выключить блокировщик рекламы для этой страницы.')" />
        <span v-else-if="activeItem === 'handouts'" :class="isRtlMode ? 'text-right' : ''" class="partners-promo-data-text" v-text="$t('Внимание! Заказывая раздаточные материалы, Вы получаете только макет, подготовленный для печати в типографии. Компания не рассылает печатную продукцию.')" />
        <span v-if="activeItem === 'banners'" class="partners-promo-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Баннеры')" />
        <span v-else-if="activeItem === 'landings'" :class="isRtlMode ? 'text-right' : ''" class="partners-promo-title" v-text="$t('Лендинги')" />
        <span v-else-if="activeItem === 'video'" :class="isRtlMode ? 'text-right' : ''" class="partners-promo-title" v-text="$t('Видео')" />
        <div v-else-if="activeItem === 'handouts'" class="d-flex align-items-center mb-1">
          <span class="partners-promo-title pointer" :class="[activeHandouts === 'businessCards' ? '-active' : '', isRtlMode ? 'ml-3' : 'mr-3']" @click="setActiveHandouts('businessCards')" v-text="$t('Визитки')" />
          <span class="partners-promo-title pointer" :class="[activeHandouts === 'booklets' ? '-active' : '', isRtlMode ? 'ml-3' : 'mr-3']" @click="setActiveHandouts('booklets')" v-text="$t('Буклеты')" />
          <span class="partners-promo-title pointer" :class="activeHandouts === 'brandBook' ? '-active' : ''" @click="setActiveHandouts('brandBook')" v-text="$t('Брендбук')" />
        </div>
        <span v-else-if="activeItem === 'avatars'" :class="isRtlMode ? 'text-right' : ''" class="partners-promo-title" v-text="$t('Аватарки')" />
        <div class="d-flex" :class="windowWidthNumber <= 767 ? 'flex-column' : 'align-items-center'">
          <lfx-filter-select
            v-if="(activeItem === 'banners' || activeItem === 'avatars') && isSizesArrayFetched"
            source="promo-size"
            :title="$t('Размер')"
            :items="sizes"
            :active-flag="sortFlags.size"
            :width="180"
            :class="windowWidthNumber <= 767 ? 'mb-3 mr-0 -w_100' : 'ml-0'"
            @click-handler="updateSort('size', $event)"
          />
          <lfx-filter-select
            v-if="isCategoryFilterShown"
            source="promo-category"
            :title="$t('Категория')"
            :items="categories"
            :active-flag="categoriesFlags.includes(sortFlags.category) ? sortFlags.category : 'any'"
            :width="180"
            :class="windowWidthNumber <= 767 ? 'mb-3 mr-0 -w_100' : 'ml-0'"
            @click-handler="updateSort('category', $event)"
          />
          <lfx-filter-select
            v-if="activeItem !== 'avatars' && isLanguagesArrayFetched"
            source="promo-language"
            :title="$t('Язык')"
            :items="languages"
            :active-flag="sortFlags.language"
            :width="180"
            :class="windowWidthNumber <= 767 ? 'mb-3 mr-0 -w_100' : 'ml-0'"
            @click-handler="updateSort('language', $event)"
          />
        </div>
        <div v-if="activeItem === 'banners' && allBannersKeys && allBannersKeys.length" class="d-flex flex-column">
          <span class="partners-promo-title mt-4" :class="isRtlMode ? 'text-right' : ''" v-text="`${$t('Найдено баннеров:')} ${allBanners.length}`" />
          <div v-for="(list, key) in allBannersKeys" :key="key" class="partners-promo-items" :class="list">
            <div
              v-for="item in allBanners"
              :key="item.name"
              class="pointer"
              :class="item.size === list ? `partners-promo-items-item -${dir}` : ''"
            >
              <div v-if="item.size === list">
                <img
                  :src="`https://my.litefinance-vi.com/promo_2019/banner/${item.name}`"
                  alt
                  :width="`${item.width}px`"
                  :height="`${item.height}px`"
                  @click="openImagePopup(`https://my.litefinance-vi.com/promo_2019/banner/${item.name}`)"
                >
                <div class="d-flex align-items-center py-3" @click="selectBanners(item.name)">
                  <lfx-icon-radio-fill v-if="item.name === selectedBanners" class="pointer" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
                  <lfx-icon-radio v-else class="pointer" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
                  <span style="font-size: 12px; color: #6d788a;" v-text="$t('Выбрать')" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <b-button v-if="selectedBanners" variant="outline-primary" style="width: 200px;" @click="copyBannerCode" v-text="$t('Скопировать код')" />
          </div>
        </div>
        <div v-else-if="activeItem === 'landings'" class="d-flex flex-column">
          <div class="partners-promo-items mt-4">
            <div
              v-for="item in allLandings"
              :key="item.name"
              class="partners-promo-items-item -landing"
              :class="`-${dir}`"
            >
              <img
                @click="openLandingPage(item)"
                :src="`https://my.litefinance-vi.com/promo_2019/landing/${item.name}`"
                alt
                class="partners-promo-items-item-image -landing"
              >
              <b-button class="partners-promo-items-item-button" :class="`-${dir}`" variant="primary" @click="copyLandingUrl(item)" v-text="$t('Копировать URL')" />
            </div>
          </div>
          <div>
            <b-button v-if="selectedLanding" variant="primary" style="width: 200px;" @click="openLandingBanners" v-text="$t('Выбрать баннер')" />
          </div>
        </div>
        <div v-else-if="activeItem === 'video'" class="d-flex flex-column">
          <div class="partners-promo-items mt-4">
            <div v-for="item in allVideo" :key="item.name" class="partners-promo-items-item -video" :class="`-${dir}`">
              <img :src="getVideoImageLink(item.name)" alt class="partners-promo-items-item-image -video" @click="openVideo(item)">
              <b-button class="partners-promo-items-item-button" :class="`-${dir}`" variant="primary" @click="copyVideoUrl(item)" v-text="$t('Копировать URL')" />
            </div>
          </div>
        </div>
        <div v-else-if="activeItem === 'handouts'" class="d-flex flex-column mt-4">
          <div class="partners-promo-items">
            <div
              v-for="item in allHandouts"
              :key="item.name"
              class="partners-promo-items-item -booklet pointer"
              :class="`-${dir}`"
            >
              <img
                v-if="activeHandouts === 'businessCards'"
                :src="`https://my.litefinance-vi.com/promo_2019/business_card/preview/${item.name}`"
                alt
                :width="`${item.width}px`"
                :height="`${item.height}px`"
                :style="{ maxWidth: windowWidth === 'sm' ? '100%' : '285px', maxHeight: windowWidth === 'sm' ? '100%' : '320px' }"
                @click="openImagePopup(`https://my.litefinance-vi.com/promo_2019/business_card/preview/${item.name}`)"
              >
              <img
                v-else-if="activeHandouts === 'booklets'"
                :src="`https://my.litefinance-vi.com/promo_2019/booklet/preview/${item.name}`"
                alt
                class="partners-promo-items-item-image -booklet"
                @click="openImagePopup(`https://my.litefinance-vi.com/promo_2019/booklet/preview/${item.name}`)"
              >
              <img
                v-else-if="activeHandouts === 'brandBook'"
                :src="`https://my.litefinance-vi.com/promo_2019/brandbook/preview/${item.name}`"
                alt
                class="partners-promo-items-item-image -brandbook"
                @click="openImagePopup(`https://my.litefinance-vi.com/promo_2019/brandbook/preview/${item.name}`)"

              >
              <div class="d-flex align-items-center py-3">
                <lfx-icon-radio-fill v-if="item.isSelect" class="pointer mr-2" />
                <lfx-icon-radio v-else class="pointer mr-2" @click.native="setHandout(item.name)" />
                <span style="font-size: 12px; color: #6d788a;" v-text="$t('Выбрать')" />
              </div>
            </div>
          </div>
          <div>
            <b-button v-if="selectedBusinessCard" variant="primary" style="width: 200px;" @click="applyHandout('business_card')" v-text="$t('Отправить заявку')" />
            <b-button v-else-if="selectedBooklet" variant="primary" style="width: 200px;" @click="applyHandout('booklet')" v-text="$t('Отправить заявку')" />
            <a v-else-if="selectedBrandBooks" :href="`https://my.litefinance.org/promo_2019/brandbook/file/${selectedBrandBookZipLink}`" class="metatrader-container-block-head-buttons-button" :class="`-${dir}`">
              <b-button variant="outline-primary" style="width: 200px;" v-text="$t('Скачать')" />
            </a>
          </div>
        </div>
        <div v-else-if="activeItem === 'avatars'" class="d-flex flex-column">
          <span class="partners-promo-title mt-4" :class="isRtlMode ? 'text-right' : ''" v-text="`${$t('Найдено аватарок:')} ${allAvatars.length}`" />
          <div v-for="(list, key) in Object.keys(avatars.allAvatars)" :key="key" class="partners-promo-items" :class="list">
            <div
              v-for="item in allAvatars"
              :key="item.name"
              class="pointer"
              :class="item.size === list ? `partners-promo-items-item -${dir}` : ''"
              @click="openImagePopup(`https://my.litefinance-vi.com/promo_2019/avatar/${item.name}`)"
            >
              <div v-if="item.size === list">
                <img :src="`https://my.litefinance-vi.com/promo_2019/avatar/${item.name}`" alt :width="`${item.width}px`" :height="`${item.height}px`">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxMenu from '~/components/_aux/lfx-menu'
import LfxIconRadioFill from '~/components/icons/lfx-icon-radio-fill'
import LfxIconRadio from '~/components/icons/lfx-icon-radio'
import LfxFilterSelect from '~/components/_aux/lfx-filter-select'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'Promo',
  components: { LfxIconChevronDown, LfxFilterSelect, LfxIconRadio, LfxIconRadioFill, LfxMenu },
  data () {
    return {
      activeItem: 'banners',
      activeHandouts: 'businessCards',
      selectedBanners: null,
      selectedLanding: null,
      selectedBooklet: null,
      selectedBusinessCard: null,
      selectedBrandBooks: null,
      selectedAvatars: [],
      cid: null,
      sizeKey: null,
      categoryKey: null,
      languageKey: null
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    menu () {
      // Меню промо страницы
      return [
        { title: this.$t('Баннеры'), route: null, flag: 'banners' },
        { title: this.$t('Лендинги'), route: null, flag: 'landings' },
        { title: this.$t('Видео'), route: null, flag: 'video' },
        { title: this.$t('Раздаточные материалы'), route: null, flag: 'handouts' },
        { title: this.$t('Аватарки'), route: null, flag: 'avatars' }
      ]
    },
    banners () {
      const result = JSON.parse(JSON.stringify(this.$store.getters['partners/getters/handler/getPartnerBanners']))
      result.lists.sizeList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любой'), result.lists.sizeList)
      result.lists.categoryList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любая'), result.lists.categoryList)
      result.lists.languageList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любой'), result.lists.languageList)
      return result
    },
    landings () {
      const result = JSON.parse(JSON.stringify(this.$store.getters['partners/getters/handler/getPartnerLandings']))
      result.lists.categoryList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любая'), result.lists.categoryList)
      result.lists.languageList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любой'), result.lists.languageList)
      return result
    },
    video () {
      const result = JSON.parse(JSON.stringify(this.$store.getters['partners/getters/handler/getPartnerVideo']))
      result.lists.languageList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любой'), result.lists.languageList)
      return result
    },
    handouts () {
      const result = JSON.parse(JSON.stringify(this.$store.getters['partners/getters/handler/getPartnerHandouts']))
      result.booklets.lists.categoryList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любая'), result.booklets.lists.categoryList)
      result.booklets.lists.languageList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любой'), result.booklets.lists.languageList)
      result.businessCards.lists.categoryList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любая'), result.businessCards.lists.categoryList)
      result.businessCards.lists.languageList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любой'), result.businessCards.lists.languageList)
      result.brandBook.lists.languageList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любой'), result.brandBook.lists.languageList)
      return result
    },
    avatars () {
      const result = JSON.parse(JSON.stringify(this.$store.getters['partners/getters/handler/getPartnerAvatars']))
      result.lists.sizeList = this.$store.getters['partners/getters/handler/transformArrays'](this.$t('Любой'), result.lists.sizeList)
      return result
    },
    sortFlags () {
      return this.$store.getters['partners/getters/handler/getPartnerSortFlags']
    },
    sizes () {
      switch (this.activeItem) {
        case 'banners':
          return this.banners.lists.sizeList
        case 'landings':
          return this.landings.lists.sizeList
        case 'avatars':
          return this.avatars.lists.sizeList
        case 'handouts':
          if (this.activeItem === 'businessCards') {
            return this.handouts.businessCards.lists.sizeList
          } else if (this.activeItem === 'booklets') {
            return this.handouts.booklets.lists.sizeList
          } else {
            return this.handouts.brandBook.lists.sizeList
          }
        default:
          return []
      }
    },
    categories () {
      let result
      switch (this.activeItem) {
        case 'banners':
          result = this.banners.lists.categoryList
          break
        case 'landings':
          result = this.landings.lists.categoryList
          break
        case 'avatars':
          result = this.avatars.lists.categoryList
          break
        case 'handouts':
          if (this.activeItem === 'businessCards') {
            result = this.handouts.businessCards.lists.categoryList
          } else {
            result = this.handouts.booklets.lists.categoryList
          }
          break
      }
      return result
    },
    categoriesFlags () {
      if (this.categories && this.categories.length) {
        return this.categories.map(item => item.flag)
      }

      return []
    },
    languages () {
      let result
      switch (this.activeItem) {
        case 'handouts':
          if (this.activeItem === 'businessCards') {
            result = this.handouts.businessCards.lists.languageList
          } else if (this.activeItem === 'booklets') {
            result = this.handouts.booklets.lists.languageList
          } else {
            result = this.handouts.brandBook.lists.languageList
          }
          break
        case 'banners':
          result = this.banners.lists.languageList
          break
        case 'landings':
          result = this.landings.lists.languageList
          break
        case 'avatars':
          result = this.avatars.lists.languageList
          break
        case 'video':
          result = this.video.lists.languageList
          break
      }
      return result
    },
    sortingStyle () {
      return {
        padding: '4px'
      }
    },
    isSizesArrayFetched () {
      if (this.sizes && this.sizes.length) {
        return !!this.sizes.find(item => item.flag === 'any') && this.sizes.every(item => item.flag) && this.sortFlags.size
      }

      return false
    },
    isCategoriesArrayFetched () {
      if (this.categories && this.categories.length) {
        return !!this.categories.find(item => item.flag === 'any') && this.categories.every(item => item.flag) && this.sortFlags.category
      }

      return false
    },
    isLanguagesArrayFetched () {
      if (this.languages && this.languages.length) {
        return !!this.languages.find(item => item.flag === 'any') && this.languages.every(item => item.flag) && this.sortFlags.language
      }

      return false
    },
    allBannersKeys () {
      return Object.keys(this.banners.allBanners)
    },
    allBanners () {
      return Object.values(this.banners.allBanners)
        .reduce((preVal, item) => preVal.concat(item), [])
        .map((item) => {
          item.isSelect = this.selectedBanners === item.name
          return item
        })
        .filter(item => this.sortFlags.size === 'any' || item.size === this.sortFlags.size)
        .filter(item => this.sortFlags.category === 'any' || item.category === this.sortFlags.category)
        .filter(item => this.sortFlags.language === 'any' || item.language === this.sortFlags.language)
    },
    allLandings () {
      return Object.values(this.landings.allLanding)
        .reduce((preVal, item) => preVal.concat(item), [])
        .map((item) => {
          item.isSelect = this.selectedLanding === item.name
          return item
        })
        .filter(item => this.sortFlags.category === 'any' || item.category === this.sortFlags.category)
        .filter(item => this.sortFlags.language === 'any' || item.language === this.sortFlags.language)
    },
    allVideo () {
      return Object.values(this.video.allVideo)
        .reduce((preVal, item) => preVal.concat(item), [])
        .filter(item => this.sortFlags.language === 'any' || item.language === this.sortFlags.language)
    },
    allHandouts () {
      if (this.activeHandouts === 'booklets') {
        return this.handouts.booklets.allBooklets
          .reduce((preVal, item) => preVal.concat(item), [])
          .map((item) => {
            item.isSelect = this.selectedBooklet === item.name
            return item
          })
          .filter(item => this.sortFlags.category === 'any' || item.category === this.sortFlags.category)
          .filter(item => this.sortFlags.language === 'any' || item.language === this.sortFlags.language)
      } else if (this.activeHandouts === 'businessCards') {
        return this.handouts.businessCards.allBusinessCards
          .reduce((preVal, item) => preVal.concat(item), [])
          .map((item) => {
            item.isSelect = this.selectedBusinessCard === item.name
            return item
          })
          .filter(item => this.sortFlags.category === 'any' || item.category === this.sortFlags.category)
          .filter(item => this.sortFlags.language === 'any' || item.language === this.sortFlags.language)
      } else {
        return this.handouts.brandBook.allBrandBooks
          .reduce((preVal, item) => preVal.concat(item), [])
          .map((item) => {
            item.isSelect = this.selectedBrandBooks === item.name
            return item
          })
          .filter(item => this.sortFlags.category === 'any' || this.categoriesFlags.includes(item.category) ? item.category === this.sortFlags.category : false)
          .filter(item => this.sortFlags.language === 'any' || item.language === this.sortFlags.language)
      }
    },
    allAvatars () {
      return Object.values(this.avatars.allAvatars)
        .reduce((preVal, item) => preVal.concat(item), [])
        .map((item) => {
          item.isSelect = this.selectedAvatars.includes(item.name)
          return item
        })
        .filter(item => this.sortFlags.size === 'any' || item.size === this.sortFlags.size)
    },
    standardCampaignId () {
      const result = Object.entries(this.$store.getters['partners/getters/handler/getPromoCampaigns']['campaign-list'])[0][0]
      return result || null
    },
    promoCid () {
      return this.$store.getters['partners/getters/handler/getPromoCid']
    },
    campaignCard () {
      return this.$store.getters['partners/getters/handler/getPromoCampaigns'].card
    },
    campaignHref () {
      return this.$store.getters['partners/getters/handler/getPromoCampaigns'].href
    },
    campaignTitle () {
      const result = Object.entries(this.$store.getters['partners/getters/handler/getPromoCampaigns']['campaign-list']).find((item) => {
        return item[0] === this.cid
      })
      return result && result.length ? result[1] : ''
    },
    isCategoryFilterShown () {
      if (this.routePages.current === 'handouts') {
        return this.activeHandouts !== 'brandBook'
      }

      return this.activeItem !== 'avatars' && this.isCategoriesArrayFetched && this.sortFlags.category && this.categoriesFlags && this.categoriesFlags.length
    },
    selectedBrandBookZipLink () {
      if (this.selectedBrandBooks) {
        return `${this.selectedBrandBooks.split('.')[0]}.zip`
      }

      return ''
    }
  },
  watch: {
    async promoCid (newValue) {
      this.cid = newValue
      await this.$store.dispatch('partners/actions/handler/fetchPromoCampaignsList', newValue)
    }
  },
  async created () {
    const activeHandout = localStorage.getItem('active_handout')

    if (activeHandout) {
      this.activeHandouts = activeHandout
      this.setActiveHandouts(activeHandout)
    }

    this.activeItem = this.routePages.current
    if (['avatars', 'video'].includes(this.routePages.current)) {
      await this.$router.push(`/${this.routePages.locale}/affiliate-promo/any/${this.routePages.current}`)
    } else if (this.routePages.current === 'banners' && ['cfd', 'oil', 'metal'].includes(this.routePages.second)) {
      this.updateSort('category', 'any')
    } else if (this.routePages.current === 'handouts' && this.routePages.second !== 'common') {
      if (activeHandout === 'brandBook') {
        this.updateSort('category', 'common')
      } else {
        this.updateSort('category', 'any')
      }
    } else {
      this.updateSort('category', this.routePages.second)
    }
    const promoCid = localStorage.getItem('promo_cid')
    if (this.promoCid && Object.entries(this.$store.getters['partners/getters/handler/getPromoCampaigns']['campaign-list']).find((item) => {
      return item[0] === this.promoCid
    })) {
      this.cid = this.promoCid
    } else if (promoCid) {
      this.cid = promoCid
    } else {
      localStorage.setItem('promo_cid', this.standardCampaignId)
      this.cid = this.standardCampaignId
    }
    await this.$store.dispatch('partners/actions/handler/fetchPromoCampaignsList', this.cid)
    await this.fetchData(this.routePages.current)
  },
  methods: {
    setActiveHandouts (item) {
      localStorage.setItem('active_handout', item)

      if (item === 'brandBook') {
        this.updateSort('category', 'common')
      }

      this.activeHandouts = item
      this.selectedBusinessCard = null
      this.selectedBooklet = null
      this.selectedBrandBooks = null
    },
    copyRefLink () {
      navigator.clipboard.writeText(this.campaignHref)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка успешно скопирована') })
    },
    clickHandler (item) {
      this.activeItem = item
      this.$router.push(`/${this.routePages.locale}/affiliate-promo/${this.routePages.second}/${item}`)

      this.fetchData(item)
    },
    updateSort (flag, value) {
      this.$store.commit('partners/mutations/handler/UPDATE_PARTNER_SORT_FLAG', {
        rootData: this.$store.state.partners.state.handler,
        data: { flag, value }
      })
      if (flag === 'category') {
        this.$router.push(`/${this.routePages.locale}/affiliate-promo/${value}/${this.routePages.current}`)
      }
    },
    selectBanners (name) {
      this.selectedBanners = name
    },
    selectAvatars (process, name) {
      if (process === 'push') {
        this.selectedAvatars.push(name)
      } else {
        this.selectedAvatars = this.selectedAvatars.filter(item => item !== name)
      }
    },
    setLanding (name) {
      this.selectedLanding = name
    },
    setHandout (name) {
      if (this.activeHandouts === 'businessCards') {
        this.selectedBusinessCard = name
      } else if (this.activeHandouts === 'booklets') {
        this.selectedBooklet = name
      } else {
        this.selectedBrandBooks = name
      }
    },
    copyBannerCode () {
      const currentBanner = this.allBanners.find(banner => banner.name === this.selectedBanners)
      const link = `<a href="${this.campaignHref}"><img src="https://my.litefinance.org/promo_2019/banner/${currentBanner.name}" height="${currentBanner.height}" width="${currentBanner.width}" alt></a>`
      navigator.clipboard.writeText(link)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка скопирована в буфер') })
    },
    copyLandingUrl (item) {
      const target = item.target.split('&').join('/')
      navigator.clipboard.writeText(`https://www.litefinance.com/${target}?uid=${this.user.uid}&cid=${this.cid}`)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка скопирована в буфер') })
    },
    copyVideoUrl (item) {
      navigator.clipboard.writeText(`https://my.litefinance.org/promo_2019/video/${item.name}`)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка скопирована в буфер') })
    },
    async openLandingBanners () {
      const landing = this.allLandings.find(landing => landing.name === this.selectedLanding)
      await this.$store.commit('partners/mutations/handler/UPDATE_PARTNER_SORT_FLAG', {
        rootData: this.$store.state.partners.state.handler,
        data: { flag: 'language', value: landing.language }
      })
      const category = ['app', 'cfd', 'crypto', 'social'].includes(landing.category) ? landing.category : 'any'
      await this.$router.push(`/${this.routePages.locale}/affiliate-promo/${category}/banners`)
      await this.$store.commit('partners/mutations/handler/UPDATE_PARTNER_SORT_FLAG', {
        rootData: this.$store.state.partners.state.handler,
        data: { flag: 'category', value: category }
      })
    },
    applyHandout (activeCategory) {
      switch (activeCategory) {
        case 'business_card':
          localStorage.setItem('handout_data', JSON.stringify({ activeCategory, file: this.selectedBusinessCard }))
          break
        case 'booklet':
          localStorage.setItem('handout_data', JSON.stringify({ activeCategory, file: this.selectedBooklet }))
          break
      }
      this.fetchForm('affiliatePromoMakeApp')
    },
    openCampaignList () {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'partners-promo-campaigns-list')
    },
    fetchData (item) {
      switch (item) {
        case 'avatars':
          this.$store.dispatch('partners/actions/handler/fetchPartnerAvatars')
          break
        case 'banners':
          this.$store.dispatch('partners/actions/handler/fetchPartnerBanners')
          break
        case 'handouts':
          this.$store.dispatch('partners/actions/handler/fetchPartnerHandouts')
          break
        case 'landings':
          this.$store.dispatch('partners/actions/handler/fetchPartnerLandings')
          break
      }
    },
    openImagePopup (imageUrl) {
      this.$store.commit('chat/mutations/handler/SAVE_MESSAGE_IMAGE_URL', {
        rootData: this.$store.state.chat.state.handler,
        data: imageUrl
      })
      this.$store.commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'chat-image'
      })
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: true
      })
    },
    openLandingPage (item) {
      const route = item.name ? item.name.split('&') : []
      const currentPage = route.length ? route.length === 3 ? route[2].split('.')[0] : route.length === 2 ? route[1].split('.')[0] : null : null

      if (currentPage) {
        window.open(`https://www.litefinance.org/land/tools/${currentPage}/`)
      }
    },
    openCampaignLink () {
      window.open(this.campaignHref)
    },
    getVideoImageLink (name) {
      const imgName = `${name.split('.')[0]}.jpg`

      return `https://my.litefinance-vi.com/promo_2019/video/preview/${imgName}`
    },
    openVideo (item) {
      window.open(`https://my.litefinance.org/promo_2019/video/${item.name}`)
    }
  }
}
</script>
