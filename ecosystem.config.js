module.exports = {
  /**
   * Application configuration section
   * @see http://pm2.keymetrics.io/docs/usage/application-declaration/
   * @see http://pm2.keymetrics.io/docs/usage/environment/
   * @see https: //github.com/nuxt/nuxt.js/issues/1541
   */
  apps: [{
    name: 'LiteForex_Cabinet_Frontend',
    script: 'npm',
    args: 'run build',
    instances: 1,
    exec_mode: 'cluster_mode',
    max_memory_restart: '2G',
    watch: false,
    ignore_watch: ['node_modules'],
    node_args: '--openssl-legacy-provider',
    env: {
      NODE_ENV: 'production',
      PM2_GRACEFUL_LISTEN_TIMEOUT: 1000,
      PM2_GRACEFUL_TIMEOUT: 5000,
      COMMON_VARIABLE: true
    },
    env_production: {
      NODE_ENV: 'production'
    },
    env_development: {
      NODE_ENV: 'development'
    }
  }]
}
