import React, { Component } from 'react'
import { render } from 'react-dom'

function noop () {}

function validateForm (elements) {
  return [].reduce.call(elements, (list, input) => {
    if (input.checkValidity()) return list

    for (let errorType in input.validity) {
      if (input.validity[errorType]) {
        list[input.name] = errorType
        return list
      }
    }
  }, {})
}

function form (WrappedComponent, suppliedOptions) {
  const defaultOptions = {
    preSubmit: noop
  }

  const options = {
    ...defaultOptions,
    ...suppliedOptions
  }

  return class Form extends Component {
    state = {

    }
    onSubmit (e) {
      e.preventDefault()
      const errors = validateForm(e.target.elements)
      console.log(errors)
      options.preSubmit(e)
      options.onSubmit(e)
    }

    render () {
      return (
        <form onSubmit={this.onSubmit} noValidate>
          <h2>I am now wrapped!</h2>
          <WrappedComponent />
        </form>
      )
    }
  }
}

const App = () => (
  <div>
    <label htmlFor='name'>Name</label>
    <input name='name' type="text" required/>
    <label htmlFor='email'>Email</label>
    <input name='email' type="email" required/>
    <button type="submit">
      Submit
    </button>
  </div>
)

const AppForm = form(App, {
  onSubmit (e) {
    console.dir(e.target)
  }
})


render(<AppForm testProp='some prop' />, document.getElementById('root'))
