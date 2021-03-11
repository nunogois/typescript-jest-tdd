export class Calculator {
  value: number
  history: Array<number>

  constructor(value: number = 0) {
    this.value = value
    this.history = []
  }

  add(n: number): number {
    this.history_add()
    this.value += n
    return this.value
  }

  subtract(n: number): number {
    this.history_add()
    this.value -= n
    return this.value
  }

  multiply(n: number): number {
    this.history_add()
    this.value *= n
    return this.value
  }

  divide(n: number): number {
    this.history_add()
    this.value /= n
    return this.value
  }

  power(n: number): number {
    this.history_add()
    this.value **= n
    return this.value
  }

  private history_add(): Array<number> {
    this.history.push(this.value)
    return this.history
  }

  undo(): number {
    if (this.history.length > 0)
      this.value = this.history.pop()
    return this.value
  }

  reset(): number {
    this.value = 0
    return this.value
  }
}