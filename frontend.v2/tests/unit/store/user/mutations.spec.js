import { USER_LOGIN_MUTATION, USER_LOGOUT_MUTATION, mutations } from '../../../../src/store/user/mutations'
import {assert} from 'chai';

describe('User Mutations', () => {
    it('should save login', () => {
        const state = {};
        mutations[USER_LOGIN_MUTATION](state, {
            login: 'hrodvitnir'
        });
        
        assert.equal(state.login, 'hrodvitnir');
    })
    it('should clear login', () => {
        const state = {
            login: 'hrodvitnir'
        };
        mutations[USER_LOGOUT_MUTATION](state);
        
        assert.equal(state.login, '');
    })
  })
  