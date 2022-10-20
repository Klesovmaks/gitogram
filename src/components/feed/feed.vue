<template>
    <div class="c-feed">
        <person class="person" :avatarImgSrc="avatarImgSrc" :userName="username" />
        <slot />
        <toggler class="toggler" @onToggle='toggle' />
        <div class="comments" v-if="shown">
            <ul class="comments-list" v-if="!this.loading">
                <li class="comments-item" v-for="comment in this.comments" :key="comment.id">
                    <comment :text="comment.title" :username="comment.user.login"/>
                </li>
            </ul>
            <placeholder v-else/>
        </div>
        <div class="feed-date">{{ convertedDate }}</div>
    </div>
</template>

<script>
import { toggler } from '../toggler'
import { comment } from '../comment'
import { person } from '../person'
import { placeholder } from '../placeholder'
import axios from 'axios'

export default {
  name: 'feed-item',
  components: {
    toggler,
    comment,
    person,
    placeholder
  },
  props: {
    username: {
      type: String,
      required: true
    },
    avatarImgSrc: {
      type: String,
      required: true
    },
    publicDate: {
      type: String,
      required: true
    },
    comm: {
    }
  },
  data () {
    return {
      shown: false,
      comments: [],
      loading: true
    }
  },
  computed: {
    convertedDate: function () {
      const localDate = new Date(this.publicDate)
      const resultDate = localDate.toLocaleString('en-US', { month: 'long', day: 'numeric' })

      return resultDate
    }
  },
  methods: {
    async toggle (isOpened) {
      this.shown = isOpened
      const { data } = await axios.get(`https://api.github.com/repos/${this.comm.owner}/${this.comm.repo}/issues`, {
        headers: {
          Authorization: `token ${localStorage.getItem('token')}`,
          accept: 'application/vnd.github.v3.html+json'
        }
      })
      this.comments = data
      this.loading = false
    }
  },
  mounted () {}
}
</script>

<style scoped lang="scss" src="./feed.scss"></style>
