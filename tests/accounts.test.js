const request = require('supertest');
const express = require('express');
const {dbConnect, dbDisconnect} = require('../appHelpers');
const AccountModel = require('../models/account');
const routes = require('../routes/index');

const app = express();

app.use('/', routes);

// class AccountHelper {
//   constructor (...args) {
//   	const {email = 'test@test.com', firstName = 'John Test'} = args
//     Object.assign(this, {email, firstName}, ...args)
//   }

//   async createAccount () {
//     account = new Account({
//       email: this.email,
//       firstName: this.firstName
//     });

//     account.save()
//   };
// }

const TEST_EMAIL = 'test@test.com'
const TEST_NAME = 'John Test'

const createAccount = async (...args) => {
  account = new AccountModel(
    Object.assign(
    	{email: TEST_EMAIL, firstName: TEST_NAME},
    	...args
    )
  );

  await account.save()
  return account
};

const dropCollection = async () => {
  // await AccountModel.collection.drop();
  await AccountModel.deleteMany({});
};

beforeAll(async () => {
  await dbConnect()
});

afterAll(async () => {
  await dbDisconnect();
});

afterEach(async () => {
  await dropCollection()
})

// it('API works', async done => {
//   const res = await request(app).get('/')

//   const account = new Account();

//   expect(res.status).toBe(200);
//   done()
// });

it('GET accounts/:id    (get once account)', async done => {
  const account = await createAccount()

  const res = await request(app).get(`/accounts/${account._id}`)
  expect(res.status).toBe(200);

  const resData = await JSON.parse(res.text).result
  expect(resData.email).toBe(TEST_EMAIL);
  done()
});

it('GET accounts/       (get list of accounts)', async done => {
  await createAccount()
  await createAccount({email: 'test2@test.com', firstName: 'John Test 2'})

  const res = await request(app).get('/accounts')
  expect(res.status).toBe(200);

  const resData = await JSON.parse(res.text).result
  expect(resData.length).toBe(2)
  expect(resData[0].email).toBe(TEST_EMAIL);
  done()
});

it('POST accounts/      (create account)', async done => {
  const res = await request(app)
    .post('/accounts')
    .send({email: TEST_EMAIL, firstName: TEST_NAME})
    console.log(res.text);
  const resData = await JSON.parse(res.text).result

  expect(res.status).toBe(200);
  expect(resData.email).toBe(TEST_EMAIL);
  done()
});
