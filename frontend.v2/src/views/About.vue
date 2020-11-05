<template>
    <div class="about">
        <div class="paragraph">
            <label>{{ $t("about.project.started.title") }}:</label>
            <span class="value">{{ $t("about.project.started.value") }}</span>
        </div>

        <div class="paragraph">
            <label>{{ $t("about.project.team.title") }}:</label>
            <span class="value">{{ $t("about.project.team.value") }}</span>
        </div>

        <div class="paragraph">
            <label>{{ $t("about.project.development.title") }}:</label>
            <span class="value">{{ $t("about.project.development.value") }}</span>
        </div>

        <div class="paragraph">
            <label>{{ $t("about.feedback") }}:</label>
            <ul class="links value">
                <li>
                    <a href="https://github.com/afferenslucem">Github</a>
                </li>
                <li>
                    <a href="https://vk.com/hrodveetnir">Vk</a>
                </li>
                <li>
                    <a href="https://t.me/hrodveetnir">Telegram</a>
                </li>
                <li>
                    <a
                            href="mailto:hrodveetnir@protonmail.com?subject=Bookolog%20Feedback"
                    >Email</a
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "@/styles/variables";

    .links {
        display: flex;

        align-items: baseline;

        justify-content: flex-start;

        > *:not(:first-child) {
            margin-left: 1rem;
        }
    }

    .paragraph {
        margin-top: 1rem;

        display: flex;

        flex-flow: column;

        label {
            font-weight: $fat-font-weight;
        }

        .value {
            margin-left: 1rem;
        }
    }
</style>
