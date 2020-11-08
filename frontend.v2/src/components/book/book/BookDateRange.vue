<template functional>
    <div class="dark-text" :class="data.staticClass">
        [
        <small
        >{{ props.book.startDate | dateFormat("...") }} -
            {{ props.book.endDate | dateFormat("...") }}</small
        >
        ]
    </div>
</template>
