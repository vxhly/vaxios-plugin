const Vaxios = []

Vaxios.install = function (Vue, options) { }

export default Vaxios

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vaxios)
}