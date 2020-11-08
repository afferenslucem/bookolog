<template>
    <div class="total-placeholder" v-if="total > 0">
        <div>{{total}} {{ total | formify('книга', 'книги', 'книг')}}</div>
    </div>
</template>

<script>
import { BOOKS_DONE_GETTER } from "@/store/naming";
export default {
    computed: {
        total() {            
            return this.$store.getters[BOOKS_DONE_GETTER]?.length || 0;
        }
    }
}
</script>
