const Service = require("./src/service");
const assert = require('assert');
const { createSandbox } = require('sinon')
const sinon = createSandbox()
const mocks = {
  lukeSkywalker: require('./mocks/luke_skywalker.json'),
  darthVader: require('./mocks/darth_vader.json'),
  c3po: require('./mocks/c_3po.json'),
}

const BASE_URL = 'https://swapi.dev/api/people'

;(async () => {

  const stub = sinon.stub(Service, Service.makeRequest.name)

  stub.withArgs(`${BASE_URL}/1`).resolves(mocks.lukeSkywalker)
  stub.withArgs(`${BASE_URL}/2`).resolves(mocks.c3po)
  stub.withArgs(`${BASE_URL}/4`).resolves(mocks.darthVader)

  /**
   * When calling the URL with ID 1, it should return Luke Skywalker
   */
  {
    const expected = {
      name: 'Luke Skywalker',
      gender: 'male',
      appearedInHowManyFilms: 4
    }

    const response = await Service.getCharacterStarWars(`${BASE_URL}/1`)
    assert.deepStrictEqual(response, expected)
  }

  /**
   * When calling the URL with ID 2, it should return C3-PO
   */
  {
    const expected = {
      name: 'C-3PO',
      gender: 'n/a',
      appearedInHowManyFilms: 6
    }

    const response = await Service.getCharacterStarWars(`${BASE_URL}/2`)
    assert.deepStrictEqual(response, expected)
  }

  /**
   * When calling the URL with ID 4, it should return Darth Vader
   */
  {
    const expected = {
      name: 'Darth Vader',
      gender: 'male',
      appearedInHowManyFilms: 4
    }

    const response = await Service.getCharacterStarWars(`${BASE_URL}/4`)
    assert.deepStrictEqual(response, expected)
  }

})()
