import logo from './logo.vue'

export default {
  title: 'logo',
  component: { logo }
}

const template = () => ({
  components: { logo },
  template: '<logo/>'
})

export const DefaultView = template.bind({})

DefaultView.story = {
  name: 'Логотип'
}
