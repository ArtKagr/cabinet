export const state = () => ({
  metatraderData: {
    archive: [],
    can_change_leverage: false,
    dormant: [],
    leverage_link: null,
    primary: {
      can_be_trader: false,
      currency: null,
      currency_label: null,
      label: null,
      leverage: null,
      login: null,
      name: null,
      phone_password: null,
      reg_date: null,
      server: null,
      server_name: null,
      terminal_link_android: null,
      terminal_link_ios: null,
      terminal_link_pc: null
    },
    status: null,
    trading: [],
    vps_available: false,
    vps_info: null
  },
  actualAccount: {
    can_be_primary: false,
    can_change_password: false,
    currency: null,
    currency_label: null,
    demo_contest_date: null,
    demo_contest_name: null,
    equity: null,
    is_demo_contest: false,
    is_enable_finance_operations: false,
    is_investor: false,
    is_primary: false,
    is_trader: false,
    label: null,
    leverage: null,
    login: null,
    margin: null,
    margin_free: null,
    name: null,
    phone_password: null,
    server: null,
    server_name: null
  },
  toggleMainAccount: null,
  primaryAccount: {},
  vpsInfo: {
    status: null,
    vps_available: true,
    vps: {}
  }
})
