import menu from './menu.vue'

export default {
  title: 'menu',
  component: { menu }
}

const template = () => ({
  components: { BaseMenu: menu },
  template: `        <BaseMenu
  :source="this.user?.avatar_url"
  @onLogout="logout"
  @onHome="$router.push({name: 'feeds'})"
/>`
})

export const DefaultView = template.bind({})

DefaultView.story = {
  name: 'Меню'
}
