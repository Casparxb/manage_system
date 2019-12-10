# managsystem

> A Vue.js project

## Build Setup
## 第一模块 登录组件
## 登录组件表单数据验证
1. 为el-form通过属性绑定:rules指定一个rules校验对象
2. 在data数据中定义该对象，其每一个属性都是校验规则
3. 为不同表单的item项，通过prop="username"指定不同验证规则

## 实现表单重置
1. 在element UI组件文档中Form Methods中有一个方法
2. resetField 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
3. 那么问题是，如何拿到表单对象中所有的数据，然后调用该对象即可
4. 用ref=""来拿原生对象的值 
5. 点击重置按钮，触发事件@click,ref拿值，调用resetField重置
+ this.$refs.loginFormRef.resetFields();

## 登录前预校验
1. 目的：输入账号密码就直接点击登录时，不应该直接发起请求，而是在发起请求之前，对表单数据进行预验证，验证通过后，才允许它发起请求，否则直接提示用户不合法
2. 方法：在点击登录时，调用表单的某个函数进行预验证，看element UI组件文档中的方法validate()
3. 给登录绑定点击事件
    this.$refs.loginFormRef.validate(valid=>{
        console.log(valid);
      });

## 发起请求
1. 安装axios，引入(由于axios不是vue的插件，不能使用Vue.use().要通过控制原型链的方式来引入)
import axios from 'axios'
Vue.prototype.$http = axios;
接下来就各个页面的每个组件都可以用this直接访问$http发起ajax请求了
2. 设置请求根路径 以后便可以直接在后面写接口地址了
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
3. 根据发起请求后得到一个Promise，为了简化，用async和await，因为await只能用在被async修饰的方法中，所以要把await外面的箭头函数修饰成异步，这样可以直接拿到服务器返回的meta数据，根据状态码判定登录是否成功
## 弹框提示
1. element  UI弹框提示
2. 组件配置过程：导入import {Message} from 'element-ui'
Vue.prototype.$message = Message
这个message需要全局挂载，$message自定义属性，可以改名字合法就行，
后面不能改，意思是把弹窗组件挂载到了Vue的原型对象上，这样每个组件都可以
通过this访问到$message，进行弹框提示
