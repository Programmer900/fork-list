<template>
    <div class="github-card">
            <div v-if="loading" key="loading">
                Loading
            </div>
            <table v-if="user && flagData" key="user" class="repo-table">
                <tr>
                    <th>Counts Repo</th>
                    <th>
                        <a class="avatar" :href="`https://github.com/${fork.login}`" target="_blank">
                            <img :src="fork.avatar_url" />
                        </a>
                        <h1>{{fork.name}}</h1>
                    </th>
                    <th>Number of forks</th>

                    <th v-if="flag" class="va_t" colspan="6" :rowspan="fork.public_repos + 1">
                            <span class="db" v-for="fork in forks">
                                <a target="_blank" :href="`${fork.html_url}`">{{fork.forks_url}}</a>
                            </span>
                    </th>
                </tr>
                <tr v-for="(r,i) in user">
                        <td>{{i+1}}</td>
                        <td class="repo-name" @click="eventHandler(r, r.name, r.owner.login)">
                                <strong>{{r.name}}</strong>
                            <br>
                        </td>
                        <td>{{r.forks}}</td>
                </tr>
            </table>
            <div v-else key="not-found">
                Результаты запроса...
            </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import axios from 'axios';

    export default {
        name: 'User',
        data() {
          return {
              forks: null,
          }
        },
        methods: {
            ...mapActions(['setSearchQuery', 'search','setFlag']),
            async eventHandler(obj, nameRepo, owner) {
                const {data} = await axios.get(`https://api.github.com/repos/${owner}/${nameRepo}/forks`);
                this.forks = data;
                this.setFlag(true);
            },
        },
        computed: mapState(['loading', 'fork', 'user', 'flag', 'flagData']),
        beforeUpdate() {
            console.log(this.flag);
        }
    };
</script>

<style scoped>
    .repo-table {
        text-align: center;
        width: 80%;
        margin: 0 auto;
    }
    .repo-table tr td {
        border: 1px solid #000;
        padding: 5px;
        cursor: pointer;
    }
    .repo-table td.repo-name:hover {
        background-color: red;
        color: #ffffff;
    }
    .repo-table tr th {
        border: 2px solid #000;
        padding: 8px;
    }

    .repo-table img {
        width: 20%;
    }
    .db {
        display: block;
        text-align: left;
        margin-bottom: 10px;
    }
    .va_t {
        vertical-align: top;
    }
</style>