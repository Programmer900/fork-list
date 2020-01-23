<template>
    <div>
        <input class="search" v-model="query" @input="debouncedSearch" placeholder="Enter username" />
    </div>
</template>


<script>
    import {mapActions, mapState} from 'vuex';
    import debounce from 'lodash/debounce';

    export default {
        name: "Search",
        computed: {
            ...mapState(['searchQuery']),
            query: {
                get() {
                    return this.searchQuery;
                },
                set(val) {
                    return this.setSearchQuery(val);
                }
            }
        },
        methods: {
            ...mapActions(['setSearchQuery', 'search','setFlag','clearData']),
            debouncedSearch: debounce(function (e) {
                console.log('Searching...', e);
                if(e.target.value) {
                    this.clearData(true);
                    this.search();

                    this.setFlag(false);
                } else {
                    this.clearData(false);
                }
            }, 800)
        }
    }
</script>
<style scoped>
    .search {
        padding: 15px 20px;
        width: 50%;
        margin: 0 auto;
        margin-bottom: 22px;
        font-size: 2em;
    }

</style>