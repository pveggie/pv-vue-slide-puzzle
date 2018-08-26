/* global describe, it, expect, beforeEach */

// it is necessary to add vue-template-compiler in order to import from vue/test-utils
import { mount } from '@vue/test-utils';
import GameTrackSquare from '@/components/GameTrackSquare';

describe('GameTrackSquare', () => {
  describe('with star', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(GameTrackSquare, {
        propsData: {
          isStar: true,
        },
      });
    });

    it('has the square--star class', () => {
      expect(wrapper.classes()).toContain('square--star');
    });

    it('contains an element for the square', () => {
      expect(wrapper.find('.star').exists()).toBe(true);
    });
  });

  describe('without star', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(GameTrackSquare, {
        propsData: {
          isStar: false,
        },
      });
    });

    it('does not have the square--star class', () => {
      expect(wrapper.classes()).not.toContain('square--star');
    });

    it('does not contain an element for the square', () => {
      expect(wrapper.find('.star').exists()).toBe(false);
    });
  });
});
