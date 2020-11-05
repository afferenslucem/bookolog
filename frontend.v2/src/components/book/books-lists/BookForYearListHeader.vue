<template functional>
  <div class="top-year" @click="listeners.click">
    <h5 class="header year-header mt-2 mb-2 d-block">
      {{ props.year.key || parent.$t("book.lists.byYear.yearNotSpecified") }}
    </h5>
    <span class="actions">
      <span class="oc-button">
        <open-list-icon v-if="!props.year.opened" />
        <close-list-icon v-else />
      </span>
      <span class="book-count">
        {{ props.year.group.length }}
      </span>
    </span>
  </div>
</template>