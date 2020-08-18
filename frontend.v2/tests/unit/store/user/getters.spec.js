import { getters } from '../../../../src/store/user/getters'
import { USER_LOGGED_IN_GETTER } from '../../../../src/store/naming'
import {assert} from 'chai';

describe('User Getters', () => {
    it('should return logged in for state with login', () => {
        const state = {
            login: 'hrodvitnir'
        };

        const result = getters[USER_LOGGED_IN_GETTER](state);
        const expected = true;
        
        assert.equal(result, expected);
    })
    it('should return isn\'t logged in for state without login', () => {
        const state = {
            login: ''
        };

        const result = getters[USER_LOGGED_IN_GETTER](state);
        const expected = false;
        
        assert.equal(result, expected);
    })
  })
  