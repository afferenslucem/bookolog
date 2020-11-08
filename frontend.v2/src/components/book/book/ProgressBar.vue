<template functional>
    <div class="progress">
        <div class="progress-bar"
             role="progressbar"
             :style="{'width': props.progress + '%'}"
             :aria-valuenow="props.progress"
             aria-valuemin="0"
             aria-valuemax="100"
        ></div>
    </div>
</template>
