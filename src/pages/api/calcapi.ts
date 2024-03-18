import axios from 'axios'

const url = axios.create({
  baseURL: 'http://127.0.0.1:8080/'
})

export const calculadora = url.post('calculadora', {
  prazo: '313131',
  parcela: "222",
  vl: '2222',
  parcelas: 'sss'
})