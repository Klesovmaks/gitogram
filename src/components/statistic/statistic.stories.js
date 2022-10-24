import statistic from './statistic.vue'
import { text, withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'statistic',
  component: { statistic },
  decorators: [withKnobs]
}

const template = () => ({
  components: { statistic },
  props: {
    starsCount: {
      default: text('starsCount', '14')
    },
    forksCount: {
      default: text('forksCount', '14')
    }
  },
  template: '<statistic class="statistic" :starsNumber="starsCount"  :forksNumber="forksCount" />'
})

export const DefaultView = template.bind({})

DefaultView.story = {
  name: 'Статистика Репозитория'
}
