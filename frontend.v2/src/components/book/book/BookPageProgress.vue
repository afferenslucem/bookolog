<template functional>
    <small :class="data.staticClass">
        <span>{{props.book.doneUnits}} </span>
        <span>
            {{props.book.doneUnits | formify('страница', 'страницы', 'страниц')}}
        </span>
        <span> из </span>
        <span>{{props.book.totalUnits}}</span>
    </small>
</template>
