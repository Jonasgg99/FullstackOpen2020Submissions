import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title:'testTitle',
    author:'testAuthor',
    url:'testUrl',
    likes:15,
    user: {name:'testname', username:'testusername'}
  }

  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Blog 
        blog={blog} 
        update={mockHandler}/>
    )
  })

  test('renders content but hides url and likes by default', () => {
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    
    const togglableContent = component.container.querySelector('.togglableBloginfo')
    expect(togglableContent).toHaveStyle('display: none')
    
  })

  test('at start detailed blog info is not displayed', () => {
    const togglableContent = component.container.querySelector('.togglableBloginfo')
    const toggleShowButton = component.container.querySelector('.showDetailsButton')

    expect(togglableContent).toHaveStyle('display: none')
    fireEvent.click(toggleShowButton)
    expect(togglableContent).not.toHaveStyle('display: none')
  }) 

  test('when like button is clicked twice, handler is called twice', () => {
    const likeButton = component.container.querySelector('.likeButton')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})