import Vue from 'vue'
import SvgIcon from '../../components/SvgIcon'// svg组件
import generateIconsView from '@/pages/common_page/svg_icons/generateIconsView.js';

// register globally
Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
//console.log("req:::::",req.keys());
//console.log("req:::::",req.keys().map(req));
const iconMap = requireAll(req);
generateIconsView.generate(iconMap);
