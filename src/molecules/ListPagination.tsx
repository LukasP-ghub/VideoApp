import React, { useContext, useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import AppContext from '../assets/context/appContext';

export default function ListPagination() {
  const { pagination: { page, totalPages }, isFavorite, handlePagination } = useContext(AppContext);

  useEffect(() => {
    handlePagination(1);
  }, [isFavorite])

  return (
    <Pagination className='justify-content-center'>
      <Pagination.First onClick={() => handlePagination('first')} />
      <Pagination.Prev disabled={page === 1 ? true : false} onClick={() => handlePagination('prev')} />
      {page > 3 ? <Pagination.Ellipsis /> : null}

      {page > 2 ? <Pagination.Item onClick={() => handlePagination(page - 2)}>{page - 2}</Pagination.Item> : null}
      {page > 1 ? <Pagination.Item onClick={() => handlePagination(page - 1)}>{page - 1}</Pagination.Item> : null}
      <Pagination.Item active>{page}</Pagination.Item>
      {totalPages - page > 1 ? <Pagination.Item onClick={() => handlePagination(page + 1)}>{page + 1}</Pagination.Item> : null}
      {totalPages - page > 2 ? <Pagination.Item onClick={() => handlePagination(page + 2)}>{page + 2}</Pagination.Item> : null}

      {totalPages - page > 2 ? <Pagination.Ellipsis /> : null}
      {totalPages > 1 && page !== totalPages ? <Pagination.Item onClick={() => handlePagination(totalPages)}>{totalPages}</Pagination.Item> : null}
      <Pagination.Next disabled={page === totalPages ? true : false} onClick={() => handlePagination('next')} />
      <Pagination.Last onClick={() => handlePagination('last')} />
    </Pagination>
  )
}
