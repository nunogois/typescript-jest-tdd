import { Calculator } from './calculator'

describe('calculator', () => {
  it('should init with a value of 0', () => {
    let calc = new Calculator()
    expect(calc.value).toBe(0)
  })

  it('should init a specific value when specified', () => {
    let calc = new Calculator(10)
    expect(calc.value).toBe(10)
  })

  describe('add', () => {
    it('should apply an addition to the current value', () => {
      let calc = new Calculator(6)
      calc.add(6)
      expect(calc.value).toBe(12)
    })
  })

  describe('subtract', () => {
    it('should apply a subtraction to the current value', () => {
      let calc = new Calculator(1)
      calc.subtract(5)
      expect(calc.value).toBe(-4)
    })
  })

  describe('multiply', () => {
    it('should apply a multiplication to the current value', () => {
      let calc = new Calculator(3)
      calc.multiply(3)
      expect(calc.value).toBe(9)
    })
  })

  describe('divide', () => {
    it('should apply a division to the current value', () => {
      let calc = new Calculator(10)
      calc.divide(2)
      expect(calc.value).toBe(5)
    })
  })

  describe('power', () => {
    it('should apply an exponentiation to the current value', () => {
      let calc = new Calculator(3)
      calc.power(3)
      expect(calc.value).toBe(27)
    })
  })

  describe('history feature with undo', () => {
    it('should keep a record of the old value whenever there is an operation', () => {
      let calc = new Calculator(1)
      expect(calc.history).toHaveLength(0)
      calc.add(4)
      calc.subtract(2)
      calc.multiply(4)
      calc.divide(2)
      calc.power(2)
      expect(calc.history).toEqual([1, 5, 3, 12, 6]) // since there is no operation after power(2), we skip 36
    })
    it('should undo the last operation and return to the previous value', () => {
      let calc = new Calculator(10)
      calc.add(5)
      calc.undo()
      expect(calc.value).toBe(10)
      calc.value = 2
      calc.power(3)
      calc.subtract(10)
      calc.undo()
      expect(calc.value).toBe(8)
    })
    it('should support multiple undos', () => {
      let calc = new Calculator(1337)
      calc.add(3)
      calc.subtract(40)
      calc.subtract(300)
      calc.undo()
      expect(calc.value).toBe(1300)
      calc.undo()
      expect(calc.value).toBe(1340)
      calc.undo()
      expect(calc.value).toBe(1337)
    })
    it('should keep the same value if there are no undos left', () => {
      let calc = new Calculator(7)
      calc.undo()
      expect(calc.value).toBe(7)
      calc.add(3)
      calc.add(20)
      calc.undo() // 3 + 7 === 10, we ignore the last add(20) since there is no operation after it, we will already be at current value 30 and our undo is the last value, 10
      calc.undo() // 7
      calc.undo() // negative undo, should do nothing
      expect(calc.value).toBe(7)
    })
  })

  describe('reset', () => {
    it('should reset the value to 0', () => {
      let calc = new Calculator(10)
      calc.reset()
      expect(calc.value).toBe(0)
    })
  })
})