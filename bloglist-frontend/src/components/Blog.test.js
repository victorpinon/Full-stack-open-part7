import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    'likes': 6,
    'title': 'Blog1',
    'author': 'Author1',
    'url': 'blog1.com',
    'user': {
      'username': 'username1',
      'name': 'Name1',
      'id': '5fdf9d8db924c128a0aae296'
    },
    'id': '5fdfa172d66ab82360a7730f'
  }

  const updateBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={updateBlog} deleteBlog={() => {}} canDelete={false} />
    )
  })

  test('Renders the blog\'s title and author, but does not render its url or number of likes by default ', async () => {
    const title = component.container.querySelector('.title')
    expect(title).toBeInTheDocument()
    const author = component.container.querySelector('.author')
    expect(author).toBeInTheDocument()

    const url = component.container.querySelector('.url')
    expect(url).toBeNull()
    const likes = component.container.querySelector('.likes')
    expect(likes).toBeNull()
  })

  test('Renders the blog\'s title, author, url and number of likes when details button is clicked ', async () => {
    const detailsButton = component.container.querySelector('.detailsButton')
    fireEvent.click(detailsButton)

    const title = component.container.querySelector('.title')
    expect(title).toBeInTheDocument()
    const author = component.container.querySelector('.author')
    expect(author).toBeInTheDocument()

    const url = component.container.querySelector('.url')
    expect(url).toBeInTheDocument()
    const likes = component.container.querySelector('.likes')
    expect(likes).toBeInTheDocument()
  })

  test('updateBlog props should be called twice if the like button is clicked twice', async () => {
    const detailsButton = component.container.querySelector('.detailsButton')
    fireEvent.click(detailsButton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})