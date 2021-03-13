import React, { useEffect, useMemo, useState } from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Api } from '../../services/api'
import TablePaginnation from '../../components/TablePaginnation'
import Cancel from '../../assets/cancel.png'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

interface ISpecialties {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

const Specialty: React.FC = () => {
  const [specialtiesOriginal, setSpecialtiesOriginal] = useState<
    ISpecialties[]
  >([])
  const [specialties, setSpecialties] = useState<ISpecialties[]>([])
  const [specialtiesSelect, setSpecialtiesSelect] = useState<
    ISpecialties | undefined
  >()

  const getSpecialty = async (): Promise<void> => {
    try {
      const response = await Api.get('/specialties')
      console.log(response.data)
      setSpecialtiesOriginal(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSpecialty()
  }, [])

  useEffect(() => {
    setSpecialties(specialtiesOriginal)
  }, [specialtiesOriginal])

  const deleteSpecialty = async (id: number): Promise<void> => {
    try {
      await Api.delete(`/${id}/specialties`)
      for (let index = 0; index < specialtiesOriginal.length; index += 1) {
        if (specialtiesOriginal[index].id === id) {
          const flag = [...specialtiesOriginal]
          flag.splice(index, 1)
          setSpecialtiesOriginal(flag)
          break
        }
      }
      setSpecialtiesSelect(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  const update = async (id: number, params: ISpecialties): Promise<void> => {
    try {
      await Api.put(`/${id}/specialties`)
      for (let index = 0; index < specialtiesOriginal.length; index += 1) {
        if (specialtiesOriginal[index].id === id) {
          const flag = [...specialtiesOriginal]
          flag[index] = params
          setSpecialtiesOriginal(flag)
          break
        }
      }
      setSpecialtiesSelect(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  const head = useMemo(() => {
    return (
      <TableRow>
        <StyledTableCell align="center">ID</StyledTableCell>
        <StyledTableCell align="center">Especialidade</StyledTableCell>
      </TableRow>
    )
  }, [])

  const body = useMemo(() => {
    const flag = specialties.map((specialty) => (
      <TableRow
        key={specialty.id}
        style={{ cursor: 'pointer' }}
        onClick={() => setSpecialtiesSelect(specialty)}
      >
        <TableCell align="center">{specialty.id}</TableCell>
        <TableCell align="center">{specialty.name}</TableCell>
      </TableRow>
    ))
    return flag
  }, [specialties])

  return (
    <>
      {specialtiesSelect !== undefined && (
        <div className="doctor-modal-main">
          <div className="doctor-modal">
            <div className="close-doctor">
              <p>Médico</p>
              <img
                src={Cancel}
                alt="close modal"
                className="icon"
                onClick={() => setSpecialtiesSelect(undefined)}
              />
            </div>
            <div className="doctor-modal-body between-column">
              <div className="label-float">
                <input
                  name="name"
                  type="text"
                  placeholder=" "
                  required
                  value={specialtiesSelect.name}
                  onChange={({ target }) =>
                    setSpecialtiesSelect({
                      ...specialtiesSelect,
                      name: target.value,
                    })
                  }
                />
                <label>Nome</label>
              </div>

              <div className="buttons" style={{ marginBottom: '30px' }}>
                <button
                  type="button"
                  className="button-delete"
                  onClick={() => deleteSpecialty(specialtiesSelect.id)}
                >
                  Deletar
                </button>
                <button
                  type="button"
                  className="button-update"
                  onClick={() =>
                    update(specialtiesSelect.id, specialtiesSelect)
                  }
                >
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="body scroll">
        <TablePaginnation head={head} body={body} />
      </div>
    </>
  )
}

export default Specialty
