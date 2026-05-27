import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/kanban'

// Получить все задачи
export async function fetchWords({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    // API возвращает { tasks: [...] }
    return response.data.tasks
  } catch (error) {
    throw new Error(error.message)
  }
}

// Получить одну задачу по ID
export async function fetchWordById({ token, id }) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    // API возвращает { task: {...} }
    return response.data.task
  } catch (error) {
    throw new Error(error.message)
  }
}

// Создать задачу
export async function postWord({ token, word }) {
  try {
    const response = await axios.post(API_URL, word, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    // API возвращает { tasks: [...] }
    return response.data.tasks
  } catch (error) {
    throw new Error(error.message)
  }
}

// Редактировать задачу
export async function editWord({ token, id, word }) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, word, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    return response.data.tasks
  } catch (error) {
    throw new Error(error.message)
  }
}

// Удалить задачу
export async function deleteWord({ token, id }) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    return response.data.tasks
  } catch (error) {
    throw new Error(error.message)
  }
}
