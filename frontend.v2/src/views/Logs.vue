<template>
  <div>
    <div class="mb-2" v-for="log in logs" :key="log.message">
      <small>
        <span>{{log.message}}</span>
        <span v-for="obj in log.objects" :key="obj.toString()">
          {{ jsonify(obj) }} <br />
        </span>
      </small>
    </div>
  </div>
</template>

<script>
import { accumulator } from "@/logger";

export default {
  methods: {
    jsonify: (obj) => JSON.stringify(obj, undefined, 2),
  },
  computed: {
    logs: () => accumulator.logs,
  },
};
</script>

<style>
</style>