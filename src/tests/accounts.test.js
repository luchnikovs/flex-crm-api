const request = require('supertest')
const {app, token, createUser, testDbConnect, testDbDisconnect} = require('./test-helpers')
const AccountModel = require('../models/account')

const TEST_EMAIL = "john@test.com"
const TEST_NAME = "John Test"
const TEST_EMAIL_2 = "alex@test.com"
const TEST_NAME_2 = "Alex Test"

const accountData = {
  email: TEST_EMAIL,
  firstName: TEST_NAME
}

const accountData2 = {
  email: TEST_EMAIL_2,
  firstName: TEST_NAME_2
}

it('API works', async done => {
  const res = await request(app)
    .get('/')

  expect(res.status).toBe(200);
  done()
});

describe('Accounts API', () => {
  beforeAll(async () => {
    await testDbConnect()
    await createUser()
  });
  
  afterAll(async () => {
    await testDbDisconnect()
  });

  afterEach(async () => {
    await AccountModel.deleteMany({})
  })

  it('GET accounts/:id    (get once account)', async done => {
    const account = await new AccountModel(accountData).save()

    const res = await request(app)
      .get(`/accounts/${account._id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.result.email).toBe(TEST_EMAIL)
    done()
  })

  it('GET accounts/       (get list of accounts)', async done => {
    await new AccountModel(accountData).save()
    await new AccountModel(accountData2).save()

    const res = await request(app)
      .get('/accounts')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.result.length).toBe(2)
    expect(res.body.result[0].email).toBe(TEST_EMAIL)
    done()
  })

  it('POST accounts/      (create account)', async done => {
    const res = await request(app)
      .post(`/accounts`)
      .send({email: TEST_EMAIL, firstName: TEST_NAME})
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')

    expect(res.status).toBe(200);
    expect(res.body.result.email).toBe(TEST_EMAIL)
    done()
  })

  it('DELETE accounts/    (delete account)', async done => {
    const account = await new AccountModel(accountData).save()

    const res = await request(app)
      .delete(`/accounts/${account._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(res.status).toBe(200)
    await AccountModel.findById(res.body.result._id, (err, response) => {
      expect(response).toBeNull()
    })
    done()
  })
})
