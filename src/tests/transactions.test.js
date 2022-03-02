const mongoose = require('mongoose');
const { MongoMemoryServer } =require('mongodb-memory-server');

const transactionRoutes = require('../routes/transactions.routes')


const router = ({ req: mockedReq = {}, res: mockedRes = {} }) => {
  let response = { status: null, data: null };

  const req = {
    user: {},
    query: {},
    params: {},
    body:{},
    ...mockedReq,
  };

  const res = {
    json: (data) => (response = { ...response, data }),
    status:  (status) => {
      response = { ...response, status };

      return { json: (data) => (response = { ...response, data }) };
    },
    ...mockedRes,
  };

  return {
    get: async(path, cb) => {
      await cb(req, res);

      return { ...response, path };
    },
    post: async(path, cb) => {
      await cb(req, res);

      return { ...response, path };
    },
    response,
  };
};

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create()

  await mongoose.connect(mongoServer.getUri(), { dbName: 'verifyMASTER' })
})

afterAll(async () => mongoose.disconnect());

describe('creating transactions', () => {
  const req = {
    body: {
      //sample bpdy
    },
  };

  it('create sample transaction',async()=>{
      const response = await transactionRoutes(router({req})).getAll
      console.log('response',response)
  })
});
