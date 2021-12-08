const axios = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SERVER_ADDRESS = 'http://localhost:', PORT = 3000 } = process.env;
const API_URL = process.env.API_URL || SERVER_ADDRESS + PORT;
const { JWT_SECRET = 'neverTell' } = process.env;
//const { rebuildDB } = require('../db/seedData');
//const client = require('../db/client')

describe('API', () => {
    let token, registeredUser;
    let routinePoductToCreateAndUpdate = {routineId: 4, activityId: 8, count: 20, duration: 300};
    beforeAll(async() => {
      await rebuildDB();
    })
    afterAll(async() => {
      await client.end();
    })
    it('responds to a request at /api/health with a message specifying it is healthy', async () => {
      const res = await axios.get(`${API_URL}/api/health`);
  
      expect(typeof res.data.message).toEqual('string');
    });
    

}