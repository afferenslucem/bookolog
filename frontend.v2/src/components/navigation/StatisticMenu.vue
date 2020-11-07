<template>
    <div class="menu">
        <span class="menu__header">{{ $t('book.lists.statistic.title') }}</span>
        <ul class="menu__body">
            <li class="menu-item" id="genresListButton" @click="goToGenres()">
                {{ $t('book.lists.statistic.genres') }}
            </li>
            <li class="menu-item" id="tagsListButton" @click="goToTags()">
                {{ $t('book.lists.statistic.tags') }}
            </li>
            <li class="menu-item" id="authorsListButton" @click="goToAuthors()">
                {{ $t('book.lists.statistic.authors') }}
            </li>
        </ul>
    </div>
</template>

<script>
    import sideMenuMixin from "@/mixins/side-menu-mixin";

    export default {
        mixins: [sideMenuMixin],
        methods: {
            async goToGenres() {
                this.$router.push({name: "Genres"});
                this.emitClick();
            },
            async goToTags() {
                this.$router.push({name: "Tags"});
                this.emitClick();
            },
            async goToAuthors() {
                this.$router.push({name: "Authors"});
                this.emitClick();
            },
        }
    };
</script>

<style lang="scss" scoped>
</style>
