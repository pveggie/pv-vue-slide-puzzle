<template>
  <div id="app">
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from './components/GameBoard';

export default {
  name: 'App',
  components: {
    GameBoard,
  },
};
</script>

<style>
body {
  margin: 0;
}

</style>
