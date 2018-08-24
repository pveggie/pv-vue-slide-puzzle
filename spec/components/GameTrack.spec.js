/* global describe, it, expect, beforeEach */

// it is necessary to add vue-template-compiler in order to import from vue/test-utils
import { mount, shallowMount } from '@vue/test-utils';
import GameTrack from '@/components/GameTrack';
import GameTrackSquare from '@/components/GameTrackSquare';
import { Siema } from 'vue2-siema';

describe('GameTrack', () => {
  let wrapper;
  let shallowWrapper;

  beforeEach(() => {
    wrapper = mount(GameTrack, {
      propsData: {
        trackIndex: 0,
        squares: [{ isStar: false }, { isStar: false }, { isStar: true }],
        squareSize: 80,
        currentSquare: 0
      }
    });

    shallowWrapper = shallowMount(GameTrack, {
      propsData: {
        trackIndex: 0,
        squares: [{ isStar: false }, { isStar: false }, { isStar: true }],
        squareSize: 80,
        currentSquare: 0
      }
    });
  });
  it('is a Vue instance', () => {
    expect(shallowWrapper.isVueInstance()).toBeTruthy();
  });

  describe('Rendering', () => {
    it('renders siema instance as a track', () => {
      expect(shallowWrapper.find(Siema).classes()).toEqual(
        expect.arrayContaining(['track', 'siema'])
      );
    });

    it('renders a GameTrackSquare for every square in the squares array', () => {
      const numSquaresSpecified = shallowWrapper.vm.squares.length;
      const numSquaresRendered = shallowWrapper.findAll(GameTrackSquare).length;
      expect(numSquaresSpecified).toBe(numSquaresRendered);
    });
  });
});
