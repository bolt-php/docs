import DefaultTheme from 'vitepress/theme'
import DemoCodePreview from './components/DemoCodePreview.vue';
import BlogIndex from './components/BlogIndex.vue';
import ModuleGrid from './components/ModuleGrid.vue';
import ModuleCard from './components/ModuleCard.vue';
import CustomLayout from './CustomLayout.vue'
import './css/style.css'

export default {
    ...DefaultTheme,
    Layout: CustomLayout,
    enhanceApp({ app }) {
        app.component("DemoCodePreview", DemoCodePreview)
        app.component("BlogIndex", BlogIndex)
        app.component("ModuleGrid", ModuleGrid)
        app.component("ModuleCard", ModuleCard)
    }
}