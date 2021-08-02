import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {Button,Row,Col,Dialog,Upload,Tabs,TabPane,Message,MessageBox,Image,ButtonGroup,Input,Switch,DropdownItem,DropdownMenu,Dropdown} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Image)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert