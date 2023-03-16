import vue from 'vue'
import SvgIcon from '@/components/svgIcon'
vue.component('svg-icon', SvgIcon)

const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => {
    requireContext.keys().map(requireContext)
}
requireAll(req)