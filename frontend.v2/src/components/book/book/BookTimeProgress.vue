<template functional>
    <small :class="data.staticClass">
        <span>{{props.book.doneUnits | timify}} </span>
        <span> из </span>
        <span>{{props.book.totalUnits | timify}}</span>
    </small>
</template>
