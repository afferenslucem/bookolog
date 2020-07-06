import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Book from '@/components/entities/Book.vue'
import { statusMock } from '../../items/books.spec'

describe('Book.vue', () => {
  it('render book to read', () => {
    const book = statusMock.books.find(item => item.id == 7);

    const wrapper = shallowMount(Book, {
      propsData: { book }
    });

    expect(wrapper.text()).to.include("Скот Шакон, Бен Страуп", 'Should show book\'s authors');
    expect(wrapper.text()).to.include("Про Git", 'Should show book\'s name');
    expect(wrapper.find('.progress').element.style['display']).to.equal('none', 'Shouldn\'t show book\'s progress');
    expect(wrapper.find('.date-range').element.style['display']).to.equal('none', 'Shouldn\'t show book\'s date range');
  })

  it('render done book', () => {
    const book = statusMock.books.find(item => item.id == 4);

    const wrapper = shallowMount(Book, {
      propsData: { book }
    });

    expect(wrapper.text()).to.include("Яков Перельман", 'Should show book\'s authors');
    expect(wrapper.text()).to.include("Занимательная физика", 'Should show book\'s name');
    expect(wrapper.find('.progress').element.style['display']).to.equal('none', 'Shouldn\'t show book\'s progress');
    expect(wrapper.find('.date-range').element.style['display']).to.not.equal('none', 'Shouldn\'t show book\'s date range');
    expect(wrapper.find('.date-range').text()).to.equal('[  ...  -  2020-06-29  ]');
  })

  it('render in progress book', () => {
    const book = statusMock.books.find(item => item.id == 5);

    const wrapper = shallowMount(Book, {
      propsData: { book }
    });

    expect(wrapper.text()).to.include("Дуглас Крокфорд", 'Should show book\'s authors');
    expect(wrapper.text()).to.include("Как устроен javascript", 'Should show book\'s name');
    expect(wrapper.find('.progress').element.style['display']).to.not.equal('none', 'Should show book\'s progress');
    expect(wrapper.find('.date-range').element.style['display']).to.not.equal('none', 'Should show book\'s date range');
    expect(wrapper.find('.date-range').text()).to.equal('[  2020-06-29  -  ...  ]');
  })
})
