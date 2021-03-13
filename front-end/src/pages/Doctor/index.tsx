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

interface IDoctor {
  Doctor: {
    id: number
    name: string
    crm: number
    telephone: string
    cellphone: string
    cep: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }
  specialty: {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }[]
}

const Doctor: React.FC = () => {
  const [doctorsOriginal, setDoctorsOriginal] = useState<IDoctor[]>([])
  const [doctors, setDoctors] = useState<IDoctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | undefined>()

  const getDoctor = async (): Promise<void> => {
    try {
      const res = await Api.get('/doctors')
      setDoctorsOriginal(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDoctor()
  }, [])

  useEffect(() => {
    setDoctors(doctorsOriginal)
  }, [doctorsOriginal])

  const handleCRM = (n: string): void => {
    const crm = n.split('')
    if (crm.length <= 7 && selectedDoctor !== undefined) {
      setSelectedDoctor({
        ...selectedDoctor,
        Doctor: { ...selectedDoctor.Doctor, crm: +n },
      })
    }
  }

  const update = async (id: number, params: IDoctor): Promise<void> => {
    try {
      await Api.put(`/${id}/doctors`)
      const flag = [...doctorsOriginal]
      for (let index = 0; index < flag.length; index += 1) {
        if (flag[index].Doctor.id === id) {
          flag[index].Doctor = params.Doctor
          setDoctorsOriginal(flag)
          break
        }
      }
      setSelectedDoctor(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteDoctor = async (id: number): Promise<void> => {
    try {
      await Api.delete(`/${id}/doctors`)
      const flag = [...doctorsOriginal]
      for (let index = 0; index < flag.length; index += 1) {
        if (flag[index].Doctor.id === id) {
          flag.splice(index, 1)
          setDoctorsOriginal(flag)
          break
        }
      }
      setSelectedDoctor(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  const head = useMemo(() => {
    return (
      <TableRow>
        <StyledTableCell align="center">Nome</StyledTableCell>
        <StyledTableCell align="center">CRM</StyledTableCell>
        <StyledTableCell align="center">Telefone</StyledTableCell>
        <StyledTableCell align="center">Celular</StyledTableCell>
        <StyledTableCell align="center">CEP</StyledTableCell>
        <StyledTableCell align="center">Especialidades</StyledTableCell>
      </TableRow>
    )
  }, [])

  const body = useMemo(() => {
    const flag = doctors.map((doctor) => (
      <TableRow
        key={doctor.Doctor.id}
        style={{ cursor: 'pointer' }}
        onClick={() => setSelectedDoctor(doctor)}
      >
        <TableCell align="center">{doctor.Doctor.name}</TableCell>
        <TableCell align="center">{doctor.Doctor.crm}</TableCell>
        <TableCell align="center">{doctor.Doctor.telephone}</TableCell>
        <TableCell align="center">{doctor.Doctor.cellphone}</TableCell>
        <TableCell align="center">{doctor.Doctor.cep}</TableCell>
        <TableCell
          align="center"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {doctor.specialty.map((speciality) => (
            <span key={speciality.id}>{speciality.name}</span>
          ))}
        </TableCell>
      </TableRow>
    ))
    return flag
  }, [doctors])

  return (
    <>
      {selectedDoctor !== undefined && (
        <div className="doctor-modal-main">
          <div className="doctor-modal">
            <div className="close-doctor">
              <p>Médico</p>
              <img
                src={Cancel}
                alt="close modal"
                className="icon"
                onClick={() => setSelectedDoctor(undefined)}
              />
            </div>
            <div className="doctor-modal-body scroll">
              <div className="label-float">
                <input
                  name="name"
                  type="text"
                  placeholder=" "
                  required
                  value={selectedDoctor.Doctor.name}
                  onChange={({ target }) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      Doctor: { ...selectedDoctor.Doctor, name: target.value },
                    })
                  }
                />
                <label>Nome</label>
              </div>

              <div className="label-float">
                <input
                  name="crm"
                  type="text"
                  placeholder=" "
                  required
                  value={selectedDoctor.Doctor.crm}
                  onChange={({ target }) => handleCRM(target.value)}
                />
                <label>CRM</label>
              </div>

              <div className="label-float">
                <input
                  name="telephone"
                  type="text"
                  placeholder=" "
                  required
                  value={selectedDoctor.Doctor.telephone}
                  onChange={({ target }) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      Doctor: {
                        ...selectedDoctor.Doctor,
                        telephone: target.value,
                      },
                    })
                  }
                />
                <label>Telefone</label>
              </div>

              <div className="label-float">
                <input
                  name="cellphone"
                  type="text"
                  placeholder=" "
                  required
                  value={selectedDoctor.Doctor.cellphone}
                  onChange={({ target }) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      Doctor: {
                        ...selectedDoctor.Doctor,
                        cellphone: target.value,
                      },
                    })
                  }
                />
                <label>Celular</label>
              </div>

              <div className="label-float">
                <input
                  name="cep"
                  type="text"
                  placeholder=" "
                  required
                  value={selectedDoctor.Doctor.cep}
                  onChange={({ target }) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      Doctor: { ...selectedDoctor.Doctor, cep: target.value },
                    })
                  }
                />
                <label>CEP</label>
              </div>

              <div className="buttons">
                <button
                  type="button"
                  className="button-delete"
                  onClick={() => deleteDoctor(selectedDoctor.Doctor.id)}
                >
                  Deletar
                </button>
                <button
                  type="button"
                  className="button-update"
                  onClick={() =>
                    update(selectedDoctor.Doctor.id, selectedDoctor)
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

export default Doctor
