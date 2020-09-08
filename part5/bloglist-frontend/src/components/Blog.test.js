import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let component

  const mockBlog = {
    title: 'Don\'t believe in the me that believes in you',
    author: 'Kamina',
    url: 'https://www.gurrenlagann.com',
    likes: 1000
  }

  beforeEach(() => {
    component = render (
      <Blog blog={mockBlog}/>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(mockBlog.title)
  })

  test('On render blog component will not show details', () => {
    const details = component.container.querySelector('.blog__blog-details')

    expect(details).toBeInstanceOf(HTMLElement)
  })
})