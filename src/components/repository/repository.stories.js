import repository from './repository.vue'
import { text, withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'repository',
  component: { repository },
  decorators: [withKnobs]
}

const template = () => ({
  components: { repository },
  props: {
    title: {
      default: text('title', 'Default Item Name')
    },
    description: {
      default: text('description', 'Default Item description')
    },
    starsCount: {
      default: text('starsCount', '231')
    },
    forksCount: {
      default: text('forksCount', '14')
    }
  },
  template: `        <repository
  :title=title
  :description=description
  :starsCount=starsCount
  :forksCount=forksCount
/>`
})

export const DefaultView = template.bind({})

DefaultView.story = {
  name: 'Репозиторий'
}
