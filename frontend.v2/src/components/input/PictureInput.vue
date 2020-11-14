<template>
    <div>
        <div class="pic-input" @click="selectPic">
            <span v-if="!fileUrl">
                <camera-icon class="pic-input__placeholder"/>
            </span>
            <div v-else class="pic-input__result" :style="{ 'background-image': `url(\'${fileUrl}\')`}"></div>
        </div>
        <input hidden
               ref="picButton"
               type="file"
               :data-buttonText="$t('settings.avatarChangeForm.noFileChosen')"
               accept="image/*"
               @change="onFileChange($event)"
        />
    </div>
</template>

<script>
    export default {
        name: "PictureInput",
        data: () => ({
            fileValue: undefined,
            fileUrl: undefined
        }),
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;

                if (!files.length) return;

                const file = files[0];

                this.readFile(file);

                this.$emit('selected', file)
            },
            readFile(file) {
                var reader = new FileReader();

                reader.onloadend = () => {
                    this.fileUrl = reader.result;
                }

                if (file) {
                    reader.readAsDataURL(file);
                    this.fileValue = file;
                }
            },
            selectPic() {
                this.$refs.picButton.click();
            }
        }
    }
</script>

<style scoped lang="scss">
    .pic-input {
        width: 4rem;
        height: 4rem;

        border-radius: 0.25rem;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #AAAAAA;

        &__placeholder {
            font-size: 1.5rem;
        }

        &__result {
            background-position: center center;
            background-size: 100% auto;
            background-repeat: no-repeat;

            height: 100%;
            width: 100%;
        }
    }
</style>
