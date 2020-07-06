import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Book from '@/components/entities/Book.vue'
import { statusMock } from '../../items/books.spec'

describe('Book.vue', () => {
  it('renders props.msg when passed', () => {
    const book = statusMock.books.find(item => item.id == 7);

    const wrapper = shallowMount(Book, {
      propsData: { book }
    });

    expect(wrapper.text()).to.include("Скот Шакон, Бен Страуп");
    expect(wrapper.text()).to.include("Про Git");
  })
})
