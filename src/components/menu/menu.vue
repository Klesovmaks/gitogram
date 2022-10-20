<template>
    <div class="c-menu">
        <button class="home-icon" @click="$emit('onHome')">
            <icon name="home" />
        </button>
        <button class="profile-icon" @click="$emit('onUser')">
            <img :src="source" alt="Profile" class="profile-icon__image" v-if="source" >
            <img src="../../img/1.png" alt="Profile" class="profile-icon__image" v-else>
        </button>
        <button class="signOut-icon" @click="$emit('onLogout')">
            <icon name="signOut" />
        </button>

    </div>
</template>

<script>
import { icon } from '../../icons'

export default {
  name: 'menu',
  emits: ['onLogout', 'onUser'],
  components: {
    icon
  },
  props: ['source']
}
</script>

<style scoped lang="scss" src="./menu.scss" ></style>
