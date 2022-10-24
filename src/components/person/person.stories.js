import person from './person.vue'
import { text, withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'person',
  component: { person },
  decorators: [withKnobs]
}

const template = () => ({
  components: { person },
  props: {
    username: {
      default: text('username', 'Default username')
    }
  },
  template: '<person class="person" avatarImgSrc=https://picsum.photos/200/300 :userName=username />'
})

export const DefaultView = template.bind({})

DefaultView.story = {
  name: 'Имя'
}
