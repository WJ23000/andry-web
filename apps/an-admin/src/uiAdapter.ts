import {
  Tooltip,
  Badge,
  Progress,
  Radio,
  Carousel,
  Checkbox,
  Col,
  InputNumber,
  Spin,
  Table,
  DatePicker,
  Button,
  Collapse,
  Popconfirm,
  FormModel,
  Icon,
  Input,
  Popover,
  Divider,
  Dropdown,
  Tree,
  Tabs,
  Menu,
  Modal,
  Pagination,
  message,
  Tag,
  Timeline,
  Row,
  Select,
  Slider,
  Upload,
  ConfigProvider,
  Cascader,
  Switch
} from "ant-design-vue";
import Vue from "vue";

Vue.use(FormModel);
Vue.use(Input);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Tag);
Vue.use(Spin);
Vue.use(Divider);
Vue.use(ConfigProvider);
Vue.use(Tooltip);
Vue.use(Table);
Vue.use(Modal);
Vue.use(Pagination);
Vue.use(InputNumber);
Vue.use(Dropdown);
Vue.use(Collapse);
Vue.use(Slider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(Select);
Vue.use(Carousel)
Vue.use(Select);
Vue.use(Checkbox);
Vue.use(Popover);
Vue.use(Badge);
Vue.use(Upload);
Vue.use(Tree);
Vue.use(Radio);
Vue.use(Icon);
Vue.use(Timeline);
Vue.use(Menu);
Vue.use(Progress);
Vue.use(Popconfirm);
Vue.use(Cascader);
Vue.use(Switch);
message.config({
  top: `100px`,
  maxCount: 1
});
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
