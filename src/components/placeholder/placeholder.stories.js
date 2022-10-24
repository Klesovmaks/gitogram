import placeholder from './placeholder.vue'

export default {
  title: 'placeholder',
  component: { placeholder }
}

const template = () => ({
  components: { placeholder },
  template: '<placeholder/>'
})

export const DefaultView = template.bind({})

DefaultView.story = {
  name: 'Комментарий заглушка'
}
