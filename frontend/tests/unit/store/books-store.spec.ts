import { expect } from "chai";
import { getters, mutations, BookMutations } from "@/store/modules/books/storage-methods";
import { statusMock } from '../items/books.spec';
import { BooksModule } from '@/types/books-module';



describe('store books getters', () => {
    it('toReadBooks should return books only with toRead status', () => {
        const toRead = getters.toReadBooks(statusMock);

        const result = toRead.map(item => item.id);

        expect(result).to.deep.equal([1, 7, 8]);
    });
    
    it('inProgressBooks should return books only with inProgress status', () => {
        const toRead = getters.inProgressBooks(statusMock);

        const result = toRead.map(item => item.id);

        expect(result).to.deep.equal([5, 6]);
    });
    
    it('doneBooks should return books only with done status', () => {
        const toRead = getters.doneBooks(statusMock);

        const result = toRead.map(item => item.id);

        expect(result).to.deep.equal([2, 3, 4]);
    });
  })


  describe('store books mutations', () => {
      it('pushBooks', () => {
          const state = {} as BooksModule;
          
          mutations[BookMutations.pushBooks](state, statusMock.books);
  
          expect(state).to.deep.equal(statusMock);
      });
    })