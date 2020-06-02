const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const {dbConnect, dbDisconnect} = require('../appHelpers')
const AccountModel = require('../models/account')
const routes = require('../routes/index')

const app = express()

app.use(bodyParser.json())
app.use('/', routes)

const TEST_EMAIL = "test@test.com"
const TEST_NAME = "John Test"

const createAccount = async (...args) => {
  account = new AccountModel(
    Object.assign(
    	{email: TEST_EMAIL, firstName: TEST_NAME},
    	...args
    )
  )

  await account.save()
  return account
}

const cleanCollection = async () => {
  await AccountModel.deleteMany({})
}

// it('API works', async done => {
//   const res = await request(app).get('/')

//   const account = new Account();

//   expect(res.status).toBe(200);
//   done()
// });

describe('Accounts API', () => {
  beforeAll(async () => {
    await dbConnect()
  });
  
  afterAll(async () => {
    await dbDisconnect()
  });

  afterEach(async () => {
    await cleanCollection()
  })

  it('GET accounts/:id    (get once account)', async done => {
    const account = await createAccount()

    const res = await request(app).get(`/accounts/${account._id}`)

    expect(res.status).toBe(200)
    expect(res.body.result.email).toBe(TEST_EMAIL)
    done()
  })

  it('GET accounts/       (get list of accounts)', async done => {
    await createAccount()
    await createAccount({email: 'test2@test.com', firstName: 'John Test 2'})

    const res = await request(app).get('/accounts')

    expect(res.status).toBe(200)
    expect(res.body.result.length).toBe(2)
    expect(res.body.result[0].email).toBe(TEST_EMAIL)
    done()
  })

  it('POST accounts/      (create account)', async done => {
    const res = await request(app)
      .post(`/accounts`)
      .send({email: TEST_EMAIL, firstName: TEST_NAME})
      .set('Accept', 'application/json')

    expect(res.status).toBe(200);
    expect(res.body.result.email).toBe(TEST_EMAIL)
    done()
  })

  it('DELETE accounts/    (delete account)', async done => {
    const account = await createAccount()

    const res = await request(app).delete(`/accounts/${account._id}`)
    
    expect(res.status).toBe(200)
    await AccountModel.findById(res.body.result._id, (err, response) => {
      expect(response).toBeNull()
    })
    done()
  })
})
