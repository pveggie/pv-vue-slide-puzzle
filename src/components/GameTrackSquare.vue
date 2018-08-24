<!-- handles styling of squares and squares with stars-->
<template>
  <div
    :class="['square', { 'square--star': isStar }]"
    :data-index="index"
    >
    <div v-if="isStar" class="star"></div>
    <div v-else class="number">{{index + 1}}</div>
  </div>
</template>

<script>
export default {
  name: 'GameTrackSquare',
  props: ['isStar', 'index'],
};
</script>

<style lang="scss">
@import './../assets/styles/variables';

$rotate-angle: 72deg;

$square-size: 80px;
$tan36: 0.726542528;
$border-left-size: 0.5 * $square-size;
$border-top-size: $border-left-size * $tan36;
$star-color: gold;

.square {
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: $square-size;
  height: $square-size;

  &:before {
    content: attr(data-index);
  }


  @if attr(data-index number, 0) == 0 {
    
    background-color: $pink;
  }
}

.star {
  position: relative;
  display: block;
  width: 0px;
  height: 0px;
  top: 2px;
  border-right: $border-left-size solid transparent;
  border-top: $border-top-size solid $star-color;
  border-left: $border-left-size solid transparent;

  &:before, &:after {
    content: '';
    position: absolute;
    display: block;
    width: 0px;
    height: 0px;
    border-right: $border-left-size solid transparent;
    border-top: $border-top-size solid $star-color;
    border-left: $border-left-size solid transparent;
  }

  &:before {
    top: -(($square-size/3) + 1px);
    left: -(ceil($square-size/2) + 1px);
    transform: rotate($rotate-angle);
  }

  &:after {
    top: -(($square-size/3) + 1px);
    left: -(ceil($square-size/2) - 1px);
    transform: rotate(-$rotate-angle);
  }
}
</style>
