<template>
  <div class="track-section">
    <siema
      :ref="`siema${trackIndex}`"
      class="siema track"
      :options="siemaOptions"
      >
        <GameTrackSquare
          v-for="(square, index) in squares"
          :index="index"
          :key="index"
          :is-star="square.isStar"
        />
    </siema>

    <div class="track-info">
      <p class="track-info-item">Current square: {{currentSquare}}</p>
    </div>
  </div>
</template>

<script>
import GameTrackSquare from './GameTrackSquare';

export default {
  name: 'GameTrack',
  components: {
    GameTrackSquare
  },
  props: {
    'trackIndex': Number,
    'squares': Array,
    'squareSize': Number,
    'currentSquare': Number,
    'scrollBy': Number,
    'scrollDirection': String,
    'squaresToMove': Number
  },
  data() {
    return {
      siemaOptions: {
        duration: 1000,
        easing: 'ease-in-out',
        perPage: 1,
        draggable: false,
        multipleDrag: false,
        loop: true,
      },
      remainingScrollBy: 0,
      updatedCurrentSquare: 0
    };
  },
  watch: {
    scrollBy() {
      this.handleScrolling()
    }
  },
  computed: {
    slider() {
      return this.$refs[`siema${this.trackIndex}`];
    },
    lastSquareIndex() {
      return this.squares.length - 1;
    },
    isTargetReachable() {
      let result;
      if (this.scrollDirection === 'right') {
        result = this.updatedCurrentSquare - this.remainingScrollBy >= 0;
      } else {
        result = this.updatedCurrentSquare + this.remainingScrollBy <= this.lastSquareIndex;
      }
      return result;
    }
  },
  methods: {
    handleScrolling() {
      // set initial values
      this.remainingScrollBy = this.scrollBy;
      this.updatedCurrentSquare = this.currentSquare;

      // if target square is in bounds
      if (this.isTargetReachable) {
        // run the basic method to set the square and emit new value
        this.slideToTargetSquare();
      }
      // if target is out of bounds
      else {
        this.slideToEnd()
        // this.resetSliderPosition();
        this.slideToTargetSquare();
      }
    },
    // slide the required number of steps in the requireed direction
    slideToTargetSquare() {     
      if (this.scrollDirection === 'right') {
        this.updatedCurrentSquare -= this.remainingScrollBy;
        this.slider.prev(this.remainingScrollBy);
      } else {
        this.updatedCurrentSquare += this.remainingScrollBy;
        this.slider.next(this.remainingScrollBy);
      };

      this.emitNewCurrentSquare(this.updatedCurrentSquare);
    },
    slideToEnd() {
      let squaresToMove;

      if (this.scrollDirection === "right") {
        squaresToMove = this.updatedCurrentSquare - 0 + 1
        this.slider.prev(squaresToMove)
        this.updatedCurrentSquare = this.lastSquareIndex;
      }
      else {
        squaresToMove = this.lastSquareIndex - this.updatedCurrentSquare + 1
        this.slider.next()
        this.updatedCurrentSquare = 0;
      }

      this.remainingScrollBy -= squaresToMove;
    },
    emitNewCurrentSquare(updatedCurrentSquare) {
      this.$emit(
        'update-current-square',
        {
          trackIndex: this.trackIndex,
          updatedCurrentSquare
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import './../assets/styles/variables';

* {
    box-sizing: border-box;
  }

$square-size: 80px;

.track-section {
  display: flex;
}

.track {
  width: $square-size;
  height: $square-size;
  margin-bottom: 10px;
  outline: 4px solid $gray-mid;
}

.track-info {
  margin-left: 20px;
  padding-top: 5px;
}

.track-info-item {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 8px;
}
</style>