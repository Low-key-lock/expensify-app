import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup removeExpense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup editExpense action object', () => {
    const action = editExpense( '12ab', { note :'fui' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '12ab',
        updates: {
            note: 'fui'
        }
    });
});

test('should setup addExpense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', async () => {
    const store = createMockStore({});
    let actions = null;
    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 1000
    };
   
    await store.dispatch(startAddExpense(expenseData)).then(() => {
      actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
    });
   
    if (actions) {
      await database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
      });
    } else {
      throw new Error('Actions array not set!');
    }
  });

  test('should add expense to database and store', async () => {
    const store = createMockStore({});
    let actions = null;
    const expenseDefaults = {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0
    };
   
    await store.dispatch(startAddExpense({})).then(() => {
      actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });
    });
   
    if (actions) {
      await database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
      });
    } else {
      throw new Error('Actions array not set!');
    }
  });

test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});