import React, {useState} from 'react'
import {Card, Row, CardColumns, Col} from 'react-bootstrap'
import BookDetail from './BookDetail'
import {useQuery} from '@apollo/client'
import {getBooks} from '../graphql-client/queries'

function BookList() {
  const [bookSelected, setBookSelected] = useState(null)

  const {loading, error, data} = useQuery(getBooks)
  if (loading) return <p>Loading books....</p>
  if (error) return <p>Error loading books!</p>

  return (
    <Row>
      <Col xs={8}>
        <CardColumns>
          {data.books.map((book) => (
            <Card
              style={{
                cursor: 'pointer',
              }}
              key={book.id}
              border='info'
              text='info'
              className='text-center shadow'
              onClick={() => setBookSelected(book.id)}>
              <Card.Body>{book.name}</Card.Body>
            </Card>
          ))}
        </CardColumns>
      </Col>

      <Col>
        <BookDetail bookId={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookList
