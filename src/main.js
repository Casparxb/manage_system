// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入全局样式表
import'./assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
//安装axios
import axios from 'axios'
Vue.prototype.$http = axios;
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.config.productionTip = false
//完整引入elementui
// import ElementUI from 'element-ui' //引入js
// import 'element-ui/lib/theme-chalk/index.css'//引入css
// Vue.use(ElementUI)
//按需引入
import { Button, Select,Form,Input,FormItem,Message, } from 'element-ui';
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
//这个message需要全局挂载，$message自定义属性，可以改名字合法就行，
//后面不能改，意思是把弹窗组件挂载到了Vue的原型对象上，这样每个组件都可以
//通过this访问到$message，进行弹框提示
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
