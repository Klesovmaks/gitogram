import storyUserItem from './storyUserItem.vue'
import { text, withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'statistic',
  component: { storyUserItem },
  decorators: [withKnobs]
}

const template = () => ({
  components: { storyUserItem },
  props: {
    username: {
      default: text('username', 'Default Name')
    }
  },
  template: `<storyUserItem
  avatar="https://picsum.photos/200/300"
  :username=username
/>`
})

export const DefaultView = template.bind({})

DefaultView.story = {
  name: 'История'
}
