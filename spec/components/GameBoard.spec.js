/* global describe, it, expect */

// it is necessary to add vue-template-compiler in order to import from vue/test-utils
import { mount } from '@vue/test-utils';
import GameBoard from '@/components/GameBoard';

describe('GameBoard', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GameBoard);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
