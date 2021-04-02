'use strict';

const supergoose = require('@code-fellows/supergoose');
const app = require('../server.js');

const client = supergoose(app.server);

describe('The Server', () => {

  async function createRecord() {

    const data = {
      name: 'foo',
      description: 'bar',
    };

    const response = await client.post('/items').send(data);

    expect(response.status).toEqual(200);

    return response.body;
  }

  it('can create a record', async () => {

    const record = await createRecord();
    expect(record._id).not.toBeNull();
    expect(record.name).not.toBeNull();
    expect(record.description).not.toBeNull();

  });

  it('can get a single record', async () => {

    const record = await createRecord();

    const id = record._id;
    const response = await client.get(`/items/${id}`);

    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(id);
    expect(response.body.name).toEqual(record.name);
    expect(response.body.description).toEqual(record.description);
  });

  it('can update a record', async () => {

    const record = await createRecord();
    const id = record._id;

    const newValues = {
      name: 'newName',
    };

    const response = await client.put(`/items/${id}`).send(newValues);
    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(id);
    expect(response.body.name).toEqual(newValues.name);
    expect(response.body.description).toEqual(record.description);
  });

  it('can delete a record', async () => {

    const record = await createRecord();
    const id = record._id;

    const response = await client.delete(`/items/${id}`);
    expect(response.status).toEqual(200);

    const getResponse = await client.get(`/items/${id}`);
    expect(getResponse.body._id).toBeUndefined();
  });

  it('can get all records', async () => {

    for (let i = 1; i <= 5; i++) {
      await createRecord();
    }

    const response = await client.get(`/items`);
    const items = response.body;

    expect(response.status).toEqual(200);
    expect(items.length).toBeGreaterThan(1);
  });

  it('properly sends a 404 on an unknown route', async () => {
    const response = await client.get('/nothing');
    expect(response.status).toBe(404);
  });

  it('properly sends a 500 when an error occurs', async () => {
    const data = {};
    const response = await client.post('/items').send(data);
    expect(response.status).toBe(500);
  });

});
