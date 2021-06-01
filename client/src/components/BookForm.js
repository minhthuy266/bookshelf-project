import React, {useState} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useQuery, useMutation} from '@apollo/client'
import {getAuthors, getBooks} from '../graphql-client/queries'
import {addSingleBook} from '../graphql-client/mutations'

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: '',
  })

  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    })
  }

  const {name, genre, authorId} = newBook

  const onSubmit = (e) => {
    e.preventDefault()
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{query: getBooks}],
    })

    setNewBook({
      name: '',
      genre: '',
      authorId: '',
    })
  }

  // GraphQL operations

  const {loading, error, data} = useQuery(getAuthors)
  const [addBook, dataMutation] = useMutation(addSingleBook)

  // console.log(dataMutation)

  return (
    <Row>
      <Col>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              type='text'
              name='name'
              placeholder='Book name'
              onChange={onInputChange}
              value={name}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Book genre'
              name='genre'
              onChange={onInputChange}
              value={genre}
            />
          </Form.Group>

          <Form.Group>
            {loading ? (
              <p>Loading author...</p>
            ) : (
              <Form.Control
                as='select'
                name='authorId'
                onChange={onInputChange}
                value={authorId}>
                <option value='' disabled>
                  Select author
                </option>
                {data.authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </Form.Control>
            )}
          </Form.Group>

          <Button className='float-right' variant='info' type='submit'>
            Add Book
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default BookForm
