<template>
  <div class="game-board">
    <div class="tracks">
      <GameTrack @update-current-square="updateTrackStatus"
        v-for="(track, index) in tracks"
        :square-size="80"
        :key="index"
        :trackIndex="index"
        :scrollBy="track.scrollBy"
        v-bind="track"
      >
      </GameTrack>
    </div>

    <div class="control-box">
      <div class="controls">
        <GameButtonGroup
        @scroll="scroll"
        v-for="buttonGroup in buttonGroups"
        :key="buttonGroup"
        :id="buttonGroup"
      />
      </div>
    </div>
  </div>
</template>

<script>
import GameTrack from './GameTrack';
import GameButtonGroup from './GameButtonGroup';

export default {
  name: 'GameBoard',
  components: {
    GameTrack,
    GameButtonGroup,
  },
  data() {
    return {
      buttonGroups: ['buttonGroupA', 'buttonGroupB', 'buttonGroupC'],
      tracks: [
        {
          id: 1,
          currentSquare: 0,
          scrollBy: 0,
          scrollDirection: '',
          scrollByValues: {
            buttonGroupA: 0,
            buttonGroupB: 3,
            buttonGroupC: 1,
          },
          squares: [
            { isStar: false },
            { isStar: false },
            { isStar: true },
            { isStar: false },
            { isStar: false },
            { isStar: false },
          ],
        },
        {
          id: 2,
          currentSquare: 0,
          scrollBy: 0,
          scrollDirection: '',
          scrollByValues: {
            buttonGroupA: 4,
            buttonGroupB: 0,
            buttonGroupC: 1,
          },
          squares: [
            { isStar: true },
            { isStar: false },
            { isStar: false },
            { isStar: false },
            { isStar: false },
            { isStar: false },
          ],
        },
        {
          id: 2,
          currentSquare: 0,
          scrollBy: 0,
          scrollDirection: '',
          scrollByValues: {
            buttonGroupA: 2,
            buttonGroupB: 1,
            buttonGroupC: 2,
          },
          squares: [
            { isStar: false },
            { isStar: false },
            { isStar: false },
            { isStar: false },
            { isStar: true },
            { isStar: false },
          ],
        },
      ],
    };
  },
  methods: {
    // scroll each track left/right according puzzle rules
    scroll(options) {
      for (let i = 0; i <= this.tracks.length - 1; i += 1) {
        const track = this.tracks[i];
        this.$set(track, 'scrollBy', track.scrollByValues[options.buttonId]);

        this.$set(track, 'scrollDirection', options.direction);
      }
    },
    updateTrackStatus(params) {
      const track = this.tracks[params.trackIndex];
      this.$set(track, 'currentSquare', params.updatedCurrentSquare);
      this.$set(track, 'scrollBy', 0);
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/styles/variables";

.game-board {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  padding: 20px 10px;
  background-color: $off-white;
}

.tracks {
  padding: 20px;
  border: 5px solid $gray-dark;
  background-color: $gray-light;
}

.control-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: $gray-dark;
  padding: 20px 10px;
}

.controls {
  padding: 20px;
  background-color: $gray-light;
}
</style>
