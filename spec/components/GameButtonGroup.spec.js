/* global describe, it, expect, beforeEach, jest, spyOn */

// it is necessary to add vue-template-compiler in order to import from vue/test-utils
import { mount } from '@vue/test-utils';
import GameButtonGroup from '@/components/GameButtonGroup';

describe('GameButtonGroup', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(GameButtonGroup, {
      propsData: {
        id: 'buttonGroupTestLabel'
      }
    });
  });

  describe('Rendering', () => {
    it('indicates the name of the group', () => {
      expect(wrapper.find('.button-group__label').text()).toBe('TestLabel');
    });

    it('includes a button for scrolling left', () => {
      const prevButton = wrapper.find('.button-group__btn--prev');
      expect(prevButton.is('button')).toBe(true);
    });

    it('includes a button for scrolling right', () => {
      const nextButton = wrapper.find('.button-group__btn--next');
      expect(nextButton.is('button')).toBe(true);
    });
  });

  describe('Actions -- Button click', () => {
    let emitScrollRequest;

    beforeEach(() => {
      emitScrollRequest = jest.fn();
      wrapper.setMethods({ emitScrollRequest: emitScrollRequest });
    });

    it('calls the emit scroll event', () => {
      const prevButton = wrapper.find('.button-group__btn--prev');
      prevButton.trigger('click');
      expect(emitScrollRequest).toHaveBeenCalled();
    });

    it('requests a left scroll when the left button is pressed', () => {
      const prevButton = wrapper.find('.button-group__btn--prev');
      prevButton.trigger('click');
      expect(emitScrollRequest).toHaveBeenCalledWith('left');
    });

    it('requests a right scroll when the right button is pressed', () => {
      const nextButton = wrapper.find('.button-group__btn--next');
      nextButton.trigger('click');
      expect(emitScrollRequest).toHaveBeenCalledWith('right');
    });
  });

  describe('Methods -- emitScrollRequest', () => {
    beforeEach(() => {
      jest.spyOn(wrapper.vm, 'emitScrollRequest');
      jest.spyOn(wrapper.vm, 'scroll');
      wrapper.update();
    });

    it('emits a scroll event to the parent', () => {
      wrapper.find('.button-group__btn--prev').trigger('click');
      expect(wrapper.emitted().scroll).toBeTruthy();
    });

    it('emits the buttonId', () => {
      wrapper.find('.button-group__btn--prev').trigger('click');
      expect(wrapper.emitted().scroll[0][0]['buttonId']).toBe(
        'buttonGroupTestLabel'
      );
    });

    it('emits the scroll direction', () => {
      wrapper.find('.button-group__btn--prev').trigger('click');
      expect(wrapper.emitted().scroll[0][0]['direction']).toBe('left');
    });
  });
});
