export const state = () => ({
  form: [],
  formTitle: null,
  formsData: {
    leverage: {
      url: 'mt/account-change-leverage',
      head: 'Изменение плеча',
      success: {
        title: '',
        description: ''
      },
      button: 'Сохранить'
    },
    name: {
      url: 'mt/account-change-name',
      head: 'Изменение имени',
      success: {
        title: 'Имя изменено',
        description: 'Имя было успешно изменено'
      },
      button: 'Сохранить'
    },
    password: {
      url: 'mt/account-change-password',
      head: 'Изменение пароля трейдера',
      success: {
        title: 'Пароль изменен',
        description: 'Пароль для счета был успешно изменен'
      },
      button: 'Сохранить'
    },
    investorPassword: {
      url: 'mt/account-change-password',
      head: 'Изменение пароля инвестора',
      success: {
        title: 'Пароль изменен',
        description: 'Пароль для счета был успешно изменен'
      },
      button: 'Сохранить'
    },
    phonePassword: {
      url: 'mt/account-change-phone-password',
      head: 'Изменение телефонного пароля',
      success: {
        title: 'Телефонный пароль изменен',
        description: 'Телефонный пароль был успешно изменен'
      },
      button: 'Сохранить'
    },
    newReal: {
      url: 'mt/new-real',
      head: 'Открыть торговый счет',
      success: {
        title: 'Торговый счет создан',
        description: 'Ваш новый торговый счет <strong>{label}</strong> был успешно создан. Также на Вашу электронную почту было направлено письмо с параметрами созданного счета.'
      },
      button: 'Открыть торговый счет'
    },
    newDemo: {
      url: 'mt/new-demo',
      head: 'Открыть торговый счет',
      success: {
        title: 'Торговый счет создан',
        description: ''
      },
      button: 'Открыть торговый счет'
    },
    internalTransfer: {
      url: 'mt/internal-transfer',
      head: 'Внутренний перевод',
      success: {
        title: 'Перевод успешно совершен',
        description: 'Средства были зачислены на счет {account}'
      },
      button: 'Перевести'
    },
    traderEdit: {
      url: 'user/trader-edit',
      head: 'Обо мне',
      success: {
        title: 'success',
        description: 'Данные успешно изменены'
      },
      button: 'Сохранить'
    },
    editEmail: {
      url: 'verification/edit-email',
      head: 'Изменение email',
      success: {
        title: 'success',
        description: 'Данные успешно изменены'
      },
      button: 'Продолжить'
    },
    editPhone: {
      url: 'verification/edit-phone',
      head: 'Изменение телефона',
      success: {
        title: 'success',
        description: 'Данные успешно изменены'
      },
      button: 'Продолжить'
    },
    editIdentity: {
      url: 'verification/edit-identity',
      head: 'Подтверждение личности',
      success: {
        title: 'success',
        description: 'Данные успешно изменены'
      },
      button: 'Продолжить'
    },
    editAddress: {
      url: 'verification/edit-address',
      head: 'Подтверждение адреса',
      success: {
        title: 'success',
        description: 'Данные успешно изменены'
      },
      button: 'Продолжить'
    },
    editUsername: {
      url: 'user/username',
      head: 'Установка никнейма пользователя',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    questionnaireEu: {
      url: 'questionnaire-eu',
      head: 'Персональная информация',
      success: {
        title: 'success',
        description: 'Данные успешно изменены'
      },
      button: 'Продолжить'
    },
    questionnaireTrader: {
      url: 'questionnaire-trader',
      head: 'Опросник трейдера',
      success: {
        title: 'success',
        description: 'Данные успешно изменены'
      },
      button: 'Продолжить'
    },
    login: {
      url: 'login',
      head: 'Войти в кабинет',
      success: {
        title: 'success',
        description: 'success'
      },
      button: 'Войти'
    },
    loginPage: {
      url: 'login',
      head: 'Войти в кабинет',
      success: {
        title: 'success',
        description: 'success'
      },
      button: 'Войти'
    },
    registration: {
      url: 'registration',
      head: 'Регистрация',
      success: {
        title: 'success',
        description: 'success'
      },
      button: 'Зарегистрироваться'
    },
    registrationPage: {
      url: 'registration',
      head: 'Регистрация',
      success: {
        title: 'success',
        description: 'success'
      },
      button: 'Зарегистрироваться'
    },
    demoDeposit: {
      url: 'demo/deposit',
      head: '',
      success: { title: '', description: '' },
      button: ''
    },
    notifications: {
      url: 'user/notifications',
      head: '',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    copyAction: {
      url: 'traders/copy-action',
      head: 'Изменение копирования',
      success: { title: 'success', description: 'success' },
      button: 'Изменить'
    },
    copyActionTrader: {
      url: 'traders/copy-action',
      head: 'Изменение копирования',
      success: { title: 'success', description: 'success' },
      button: 'Изменить'
    },
    resetPassword: {
      url: 'reset-password/request',
      head: 'Восстановление пароля',
      success: { title: 'success', description: 'success' },
      button: 'Отправить'
    },
    confirmEmail: {
      url: 'reset-password/confirm',
      head: 'Сброс пароля',
      success: { title: 'success', description: 'success' },
      button: 'Отправить'
    },
    financeHistory: {
      url: 'finance/get-history',
      head: 'Фильтр транзакций',
      success: { title: 'success', description: 'success' },
      button: 'Отправить'
    },
    addWallet: {
      url: 'finance/add-wallet',
      head: 'Добавление кошелька',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    addBank: {
      url: 'finance/add-wallet',
      head: 'Добавление банковского счета',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    addCard: {
      url: 'finance/add-wallet',
      head: 'Добавление банковской карты',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    addBankCard: {
      url: 'finance/add-wallet',
      head: 'Добавление банковской карты',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    editBank: {
      url: 'finance/edit-wallets',
      head: 'Изменение банковского счета',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    addBankTransfer: {
      url: 'finance/add-wallet',
      head: 'Добавление банковского счета',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    withdrawalRequest: {
      url: 'withdrawal/request',
      head: 'Добавление банковской карты',
      success: { title: 'success', description: 'success' },
      button: 'Продолжить'
    },
    withdrawalRequestModal: {
      url: 'withdrawal/request',
      head: 'Добавление банковской карты',
      success: { title: 'success', description: 'success' },
      button: 'Продолжить'
    },
    depositRequest: {
      url: 'deposit/request',
      head: 'Добавление банковской карты',
      success: { title: 'success', description: 'success' },
      button: 'Продолжить'
    },
    depositRequestModal: {
      url: 'deposit/request',
      head: 'Добавление банковской карты',
      success: { title: 'success', description: 'success' },
      button: 'Продолжить'
    },
    depositRequestCard: {
      url: 'deposit/request',
      head: 'Добавление банковской карты',
      success: { title: 'success', description: 'success' },
      button: 'Продолжить'
    },
    affiliatePrograms: {
      url: 'affiliate-programs',
      head: 'Региональный представитель',
      success: { title: 'success', description: 'success' },
      button: 'Отправить заявку'
    },
    affiliateCreateCompany: {
      url: 'affiliate/create-company',
      head: 'Создание кампании',
      success: { title: 'success', description: 'success' },
      button: 'Создать'
    },
    affiliateEditCompany: {
      url: 'affiliate/edit-company',
      head: 'Редактирование',
      success: { title: 'success', description: 'success' },
      button: 'Сохранить'
    },
    affiliateTransfer: {
      url: 'affiliate/transfer',
      head: 'Партнерский перевод',
      success: { title: 'success', description: 'success' },
      button: 'Перевести'
    },
    affiliatePromoMakeApp: {
      url: 'affiliate-promo/make-application',
      head: 'Оформить заявку',
      success: { title: 'Успех', description: 'Ваша заявка была успешно отправлена' },
      button: 'Отправить'
    },
    affiliateCalculator: {
      url: 'affiliate-calculator',
      head: 'Калькулятор для расчета партнерской комиссии',
      success: { title: 'success', description: 'success' },
      button: 'Рассчитать'
    },
    secureGoogleCheck: {
      url: 'secure-google-check',
      head: 'Введите проверочный код',
      success: { title: 'success', description: 'success' },
      button: 'Продолжить'
    },
    twitterWatcher: {
      url: 'analytics/activation-twitter-watcher',
      head: 'Активировать сигналы',
      success: { title: 'success', description: 'Сервис подключен' },
      button: 'Активировать за {amount} USD'
    },
    pepStatus: {
      url: 'verification/pep',
      head: 'Политически значимое лицо',
      success: { title: 'success', description: 'success' },
      button: 'Отправить'
    },
    buyVps: {
      url: 'vps/buy',
      head: 'Покупка VPS',
      success: { title: 'success', description: 'success' },
      button: 'Купить'
    }
  },
  emptyFormData: {
    url: null,
    head: null,
    success: { title: null, description: null },
    button: null
  },
  isEuCountry: null,
  demoDepositAmount: 10000
})
