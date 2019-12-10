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
axios.defaults.baseURL = 'http://49.235.242.56:8888/api/private/v1/'
3. 根据发起请求后得到一个Promise，为了简化，用async和await，因为await只能用在被async修饰的方法中，所以要把await外面的箭头函数修饰成异步，这样可以直接拿到服务器返回的meta数据，根据状态码判定登录是否成功
## 弹框提示
1. element  UI弹框提示
2. 组件配置过程：导入import {Message} from 'element-ui'
Vue.prototype.$message = Message
这个message需要全局挂载，$message自定义属性，可以改名字合法就行，
后面不能改，意思是把弹窗组件挂载到了Vue的原型对象上，这样每个组件都可以
通过this访问到$message，进行弹框提示
3. 使用this.$message.error('登录失败!')

## 登录成功后的操作行为
1. 将成功后的token，保存到客户端的window.sessionStorage.serItem()中
+ 项目中除了登录之外的API接口，必须在登录之后才能访问
+ token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
2. 通过编程式导航跳转到后台主页，路由地址为'/home'

## 路由导航守卫控制访问权限
1. 分析需求：当成功登录后跳转到/home，当我们把token清除，重新刷新页面
 发现依旧能访问到/home.因此需要路由导航守卫：
如果用户没有登录，但是直接通过特定的URL访问特定页面，需要重新导航到登录页面

## 退出
1. 分析原理：只需要销毁本地的token即可，这样后续的请求就不会携带token，得重新生成一个新的token才能访问页面
2. 方法：window.sessionStorage.clear()
    this.$router.push('/login')

## 第二模块 主页布局
## element-ui快速布局
1. header 区域布局
分析：左右布局，左边是logo和文字，右边是退出按钮，flex布局
内部span文字区域和左边被div包裹，为了让文字居中，给div也设置flex布局即可
2. 左侧菜单布局
通过接口，获取菜单数据
方法：通过axios请求拦截器添加token，保证拥有获取数据的权限
需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
+ 通过2层v-for循环，将左侧菜单结构渲染出来哦
+ 左侧菜单格式美化
3. 左侧菜单折叠与展开
如何让侧边栏的总体宽度也变小
`<el-aside :width="isCollapse ? '64px' : '200px' ">`
判断，当侧边栏菜单内容折叠时，让侧边栏总体宽度也变小，扩展时变大


## 第三模块 路由
1. 实现首页路由重定向
2. 将左侧菜单改造为路由链接
在el-menu 中开启:router="true"或者router，模式
启用该模式会在激活导航时以 index 作为 path 进行路由跳转
在二级菜单处调用，因为path唯一，但是纯字符串，路由跳转必须以'/'开头
因此拼接一个路由地址el-menu-item :index="'/' + subItem.path"

## 第四模块 用户管理