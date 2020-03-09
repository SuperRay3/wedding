class Publiser {
  constructor() {
    this.observers = []
  }

  add(observer) {
    this.observers.push(observer)
  }

  remove(observer) {
    this.observers.forEach((item, i) => {
      if (item === observer) this.observers.splice(i, 1)
    })
  }

  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}

class Observer {
  constructor() {}

  update() {
    console.log('发布者发布更新，订阅者收到通知了！')
  }
}

module.exports = {
  Publiser,
  Observer
}