<template>
  <div class="profile-page-verification">
    <div class="profile-page-verification-container">
      <!-- Email:
           статус - email_status: bool;
           статус документов - change_email_docs: string;
      -->
      <div class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title" :class="`-${dir}`" v-text="$t('Email')" />
            <span class="profile-page-verification-container-row-data-container-value" v-text="user && user.email ? user.email : null" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0">
            <b-button
              v-if="verificationData && verificationData.email_status"
              :style="badgeStyle"
              variant="success-badge"
              v-text="$t('Верифицировано')"
            />
            <b-button
              v-else-if="verificationData && verificationData.change_email_docs === 'process'"
              :style="badgeStyle"
              variant="info-badge"
              v-text="$t('На рассмотрении')"
            />
            <b-button
              v-else-if="verificationData && verificationData.change_email_docs === 'rejected'"
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Отклонено')"
            />
            <b-button
              v-else
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Не верифицировано')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="showForm('editEmail')"
          v-text="$t('Изменить')"
        />
      </div>
      <!-- Phone:
           статус - phone_status: bool;
           статус документов - change_phone_contract_docs: string, change_phone_docs: string;
       -->
      <div class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title" :class="`-${dir}`" v-text="$t('Телефон')" />
            <span class="profile-page-verification-container-row-data-container-value" v-text="user && user.phone ? user.phone : $t('Не указано')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0">
            <b-button
              v-if="verificationData && verificationData.phone_status"
              :style="badgeStyle"
              variant="success-badge"
              v-text="$t('Верифицировано')"
            />
            <b-button
              v-else-if="verificationData && (verificationData.change_phone_docs === 'process' || verificationData.change_phone_contract_docs === 'process')"
              :style="badgeStyle"
              variant="info-badge"
              v-text="$t('На рассмотрении')"
            />
            <b-button
              v-else-if="verificationData && (verificationData.change_phone_docs === 'rejected' || verificationData.change_phone_contract_docs === 'rejected')"
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Отклонено')"
            />
            <b-button
              v-else
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Не верифицировано')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="showForm('editPhone')"
          v-text="$t('Изменить')"
        />
      </div>
      <!-- Language -->
      <div v-if="currentLanguage && currentLanguage.title" class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title" :class="`-${dir}`" v-text="$t('Язык')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0">
            <span class="profile-page-verification-container-row-data-container-value" v-text="currentLanguage.title" />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="showPopup('language')"
          v-text="$t('Изменить')"
        />
      </div>
      <!-- Name:
           статус - name_status: bool;
           статус документов - name_docs: string
       -->
      <div class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title -high" :class="`-${dir}`" v-text="$t('Подтверждение личности')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0">
            <b-button
              v-if="verificationData && verificationData.name_status"
              :style="badgeStyle"
              variant="success-badge"
              v-text="$t('Верифицировано')"
            />
            <b-button
              v-else-if="verificationData && verificationData.name_docs === 'process'"
              :style="badgeStyle"
              variant="info-badge"
              v-text="$t('На рассмотрении')"
            />
            <b-button
              v-else-if="verificationData && verificationData.name_docs === 'rejected'"
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Отклонено')"
            />
            <b-button
              v-else
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Не верифицировано')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="showForm('editIdentity')"
          v-text="$t('Изменить')"
        />
      </div>
      <!-- Address:
           статус - address_status: bool;
           статус документов - address_docs: string;
       -->
      <div class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title -high" v-text="$t('Подтверждение адреса')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0">
            <b-button
              v-if="verificationData && verificationData.address_status"
              :style="badgeStyle"
              variant="success-badge"
              v-text="$t('Верифицировано')"
            />
            <b-button
              v-else-if="verificationData && verificationData.address_docs === 'process'"
              :style="badgeStyle"
              variant="info-badge"
              v-text="$t('На рассмотрении')"
            />
            <b-button
              v-else-if="verificationData && verificationData.address_docs === 'rejected'"
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Отклонено')"
            />
            <b-button
              v-else
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Не верифицировано')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="showForm('editAddress')"
          v-text="$t('Изменить')"
        />
      </div>
      <!-- Основной опросник -->
      <div v-if="user.is_eu" class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title -high" v-text="$t('Основной опросник')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0">
            <b-button
              v-if="verificationData && verificationData.questionnaire_filled"
              :style="badgeStyle"
              variant="success-badge"
              v-text="$t('Заполнено')"
            />
            <b-button
              v-else
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Не заполнено')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="showQuestionnaire"
          v-text="$t('Заполнить')"
        />
      </div>
      <!-- Согласие с рисками -->
      <div v-if="user.is_eu" class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title -high" v-text="$t('Согласие с рисками')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0">
            <b-button
              v-if="verificationData && verificationData.risk_acceptance_docs === 'no'"
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Не заполнено')"
            />
            <b-button
              v-else-if="verificationData && verificationData.risk_acceptance_docs === 'process'"
              :style="badgeStyle"
              variant="info-badge"
              v-text="$t('На рассмотрении')"
            />
            <b-button
              v-else-if="verificationData && verificationData.risk_acceptance_docs === 'rejected'"
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Отклонено')"
            />
            <b-button
              v-else
              :style="badgeStyle"
              variant="success-badge"
              v-text="$t('Заполнено')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="showPopup('verification-risk-acceptance')"
          v-text="$t('Заполнить')"
        />
      </div>
      <!--Islamic-->
      <div
        v-if="!user.is_eu && verificationData && verificationData.swap_free_status !== 'no'"
        class="profile-page-verification-container-row"
      >
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title -high" v-text="$t('Заявка на исламский счет')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0">
            <b-button
              v-if="verificationData && verificationData.swap_free_status === 'yes'"
              :style="badgeStyle"
              variant="success-badge"
              v-text="$t('Заполнено')"
            />
            <b-button
              v-if="verificationData && verificationData.swap_free_status === 'unknown'"
              :style="badgeStyle"
              variant="outline-danger-badge"
              v-text="$t('Не заполнено')"
            />
          </div>
        </div>
        <b-button
          v-if="verificationData && verificationData.swap_free_status === 'unknown'"
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="showPopup('verification-islamic')"
          v-text="$t('Заполнить')"
        />
      </div>
      <!-- Cards -->
      <template v-if="verificationData.cards && verificationData.cards.length">
        <div v-for="card in verificationData.cards" :key="card.id" class="profile-page-verification-container-row">
          <div class="profile-page-verification-container-row-data">
            <div class="profile-page-verification-container-row-data-container">
              <span class="profile-page-verification-container-row-data-container-title -high" v-text="`${$t('Банковская карта')} ${card.number}`" />
            </div>
            <div class="profile-page-verification-container-row-data-container m-0">
              <b-button
                v-if="card.doc_front === 'verified' && card.doc_back === 'verified'"
                :style="badgeStyle"
                variant="success-badge"
                v-text="$t('Верифицировано')"
              />
              <b-button
                v-else-if="card.doc_front === 'process' || card.doc_back === 'process'"
                :style="badgeStyle"
                variant="info-badge"
                v-text="$t('На рассмотрении')"
              />
              <b-button
                v-else-if="card.doc_front === 'rejected' || card.doc_back === 'rejected'"
                :style="badgeStyle"
                variant="outline-danger-badge"
                v-text="$t('Отклонено')"
              />
              <b-button
                v-else
                :style="badgeStyle"
                variant="outline-danger-badge"
                v-text="$t('Не верифицировано')"
              />
            </div>
          </div>
          <b-button
            v-if="!((card.doc_front === 'process' && card.doc_back === 'process') || (card.doc_front === 'verified' && card.doc_back === 'verified'))"
            class="profile-page-verification-container-row-button"
            variant="outline-primary"
            @click="openBankCardPopup('verification-bank-card', card)"
            v-text="$t('Подтвердить')"
          />
        </div>
      </template>
      <!-- -->
      <div v-if="!verificationData.politically_exposed_person" class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span
              class="profile-page-verification-container-row-data-container-title -high"
              :class="`-${dir}`"
              style="width: 220px"
              v-text="$t('Заявить о своем статусе политически значимого лица')"
            />
          </div>
        </div>
        <div class="profile-page-verification-container-row-data-container m-0">
          <b-button
            class="profile-page-verification-container-row-button"
            variant="outline-primary"
            @click="fetchForm('pepStatus')"
            v-text="$t('Заявить')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Verification',
  data () {
    return {
      badgeStyle: { padding: '5px 10px 3px', lineHeight: 1, fontSize: '10px', borderRadius: '3px' }
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Верификация')}`)
    }
  },
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    modals () {
      return [
        { id: 'verification-email-modal', title: this.$t('Изменение email') },
        { id: 'verification-phone-modal', title: this.$t('Подтверждение телефона') },
        { id: 'verification-phone-verify-modal', title: this.$t('Введите проверочный код') },
        { id: 'verification-language-modal', title: this.$t('Язык') },
        { id: 'verification-id-confirmation-modal', title: this.$t('Подтверждение личности') },
        { id: 'verification-address-confirmation-modal', title: this.$t('Подтверждение адреса') },
        { id: 'verification-islamic-account', title: this.$t('Заявка на исламский счет') }
      ]
    },
    verificationData () {
      return this.$store.getters['profile/getters/handler/getVerificationData']
    },
    languagesList () {
      return this.$store.getters['dictionaries/getters/handler/getLanguages']
    },
    currentLanguage () {
      return this.languagesList.find(language => language.flag === this.$store.getters['dictionaries/getters/handler/getRoutePages'].locale)
    }
  },
  created () {
    this.$store.dispatch('profile/actions/handler/fetchProfileVerificationData')
  },
  methods: {
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    showForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    },
    openBankCardPopup (popupName, card) {
      this.showPopup(popupName)
      this.$store.commit('profile/mutations/handler/SAVE_ACTIVE_BANK_CARD', {
        rootData: this.$store.state.profile.state.handler,
        data: card
      })
    },
    showQuestionnaire () {
      localStorage.removeItem('step_quest_eu')
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'questionnaireEu')
    },
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    }
  }
}
</script>
