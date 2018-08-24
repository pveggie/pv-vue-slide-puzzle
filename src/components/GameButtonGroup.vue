<template>
  <div :id="id" class="button-group">
    <button @click="emitScrollRequest('left')"
      class="button-group__btn button-group__btn--prev">
      Move Left
    </button>
    <div class="button-group__label">{{ label }}</div>
    <button @click="emitScrollRequest('right')"
      class="button-group__btn button-group__btn--next">
      Move Right
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  computed: {
    label() {
      return this.id.replace(/buttonGroup/, '');
    }
  },
  methods: {
    emitScrollRequest(direction) {
      const options = {
        direction,
        buttonId: this.id
      };
      this.$emit('scroll', options);
    }
  }
};
</script>

<style lang="scss">
@import './../assets/styles/variables';

$button-width: 35px;

.button-group {
  display: flex;
  width: $button-width * 4;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $button-width;
  padding: 0;
  font-size: 18px;
  color: $black;

  &:last-child {
    margin-bottom: 0;
  }
}

.button-group__btn {
  font-size: 0;
  line-height: 0;
  color: transparent;
  background-color: transparent;
  cursor: pointer;
  width: $button-width;
  height: $button-width;
  position: relative;
  border: none;
  outline: none;

  &:before {
    visibility: visible;
    display: block;
    content: "";
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border-top: ($button-width / 2) solid transparent;
    border-bottom: ($button-width /2) solid transparent;
  }
}

.button-group__btn--prev:before {
  left: 0;
  border-right: ($button-width) solid $green;
}

.button-group__btn--next:before {
  right: 0;
  border-left: ($button-width) solid $burgundy;
}
</style>

