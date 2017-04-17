import Home from './home'

describe('Home', () => {
  it('has a created hook', () => {
    expect(typeof Home.created).toBe('function')
  })

  it('correctly sets the message when created', () => {
    const vm = Home.data()
    expect(vm.title).toBe('New VueJS App')
  })
})
