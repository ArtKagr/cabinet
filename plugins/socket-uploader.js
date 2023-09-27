import Vue from 'vue'

Vue.prototype.$uploader = (fileClient) => {
  try {
    return fileClient
  } catch (e) {
    console.warn(e)
  }
}
