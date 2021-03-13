import React, { useEffect, useState } from 'react'
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// import { Container } from './styles';

const useStyles = makeStyles({
  table: {
    minWidth: 1200,
  },
})
interface ITable {
  head: JSX.Element
  body: JSX.Element[]
}

const TablePaginnation: React.FC<ITable> = ({ head, body }: ITable) => {
  const classes = useStyles()

  const [tableHead, setTableHead] = useState(head)
  const [tableBody, setTableBody] = useState(body)

  useEffect(() => {
    setTableHead(head)
    setTableBody(body)
  }, [head, body])
  return (
    <TableContainer component={Paper} style={{ height: '100%' }}>
      <Table
        size="small"
        aria-label="customized table"
        className={classes.table}
      >
        <TableHead>{tableHead}</TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablePaginnation
