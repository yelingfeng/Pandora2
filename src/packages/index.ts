import { App } from 'vue'
import Button from './Form/components/Button/index.vue'
import Text from './Form/components/Text/index.vue'
import Select from './Form/components/Text/index.vue'

const components = [Button, Text, Select]

const install = function (app: App) {
  components.forEach((component) => {
    app.component(component.name, component)
  })
  return app
}

export default {
  install,
  Button,
  Text,
  Select
}
