// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//安装axios
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://49.235.242.56:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
  //在最后必须return config
})
Vue.prototype.$http = axios;


Vue.config.productionTip = false
//完整引入elementui
// import ElementUI from 'element-ui' //引入js
// import 'element-ui/lib/theme-chalk/index.css'//引入css 
// Vue.use(ElementUI)
//按需引入
import {
  Button, Select, Form, Input, FormItem, Message,
  Container, Header, Aside, Main, Menu, Submenu, MenuItem, 
  Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,
  Switch,Tooltip,Pagination,Dialog,MessageBox,Tag,Tree,
  Option,Cascader, Alert, TabPane,Tabs, Steps,Step, Checkbox,
  Upload,
} from 'element-ui';
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.use(Upload)

//这个message需要全局挂载，$message自定义属性，可以改名字合法就行，
//后面不能改，意思是把弹窗组件挂载到了Vue的原型对象上，这样每个组件都可以
//通过this访问到$message，进行弹框提示
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm 

Vue.component('tree-table',TreeTable)
//将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + '').padStart(2,'0')
  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')
  return `${yyyy}-${mm}-${dd} ${hh}:${mm}:${ss}`
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
