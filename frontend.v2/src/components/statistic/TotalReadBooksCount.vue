<template>
    <div class="total-placeholder" v-if="total > 0">
        <div>{{total}} {{getLabel(total, 'книга', 'книги', 'книг')}}</div>
    </div>
</template>

<script>
import { BOOKS_DONE_GETTER } from "@/store/naming";
export default {
    computed: {
        total() {            
            return this.$store.getters[BOOKS_DONE_GETTER]?.length || 0;
        }
    },
    methods: {
        getLabel(count, label1, label2, label3) {
            const lostBy100 = count % 100;
            const lostBy10 = count % 10;

            if (lostBy100 < 20 && lostBy100 > 10 || lostBy10 > 4) return label3;
            else if (lostBy10 === 1) return label1;
            else return label2;
        }
    }
}
</script>
