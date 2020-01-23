<template>
  <div class="home">
    <Search />
    <User/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import User from "../components/User";

export default {
  name: 'home',
  data: function() {
    return {
      text: '',
    }
  },
  components: {
    Search,
    User
  },
  methods: {
  },
  beforeMount() {
  }
}
</script>
