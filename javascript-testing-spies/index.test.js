const { createSandbox } = require('sinon')
const sinon = createSandbox()
const assert = require('assert')
const Fibonacci = require('./src/fibonacci');

;(async () => {
  
  {
    
    const spy = sinon.spy(
      Fibonacci,
      Fibonacci.execute.name
    )

    for(const sequence of Fibonacci.execute(5)) {}
    const expecetedCallCount = 6
    assert.strictEqual(spy.callCount, expecetedCallCount)
    const { args } = spy.getCall(2)
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams)
    spy.restore()
  }

  {
    
    const spy = sinon.spy(
      Fibonacci,
      Fibonacci.execute.name
    )

    const results = [...Fibonacci.execute(3)]
    const expecetedCallCount = 4
    assert.strictEqual(spy.callCount, expecetedCallCount)
    const { args } = spy.getCall(2)
    const expectedParams = [1, 1, 2]
    assert.deepStrictEqual(args, expectedParams)
    const expectedResults = [0, 1, 1]
    assert.deepStrictEqual(results, expectedResults)
    spy.restore()
  }
})()