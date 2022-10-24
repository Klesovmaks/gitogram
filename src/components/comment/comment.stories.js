import comment from './comment.vue'
import { text, withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'comment',
  component: { comment },
  decorators: [withKnobs]
}

const template = () => ({
  components: { comment },
  props: {
    username: {
      default: text('username', 'Default Name')
    },
    text: {
      default: text('text', 'Default text')
    }
  },
  template: `    <comment 
  :username=username
  :text=text 
/>`
})

export const DefaultView = template.bind({})

DefaultView.story = {
  name: 'Комментарий'
}
