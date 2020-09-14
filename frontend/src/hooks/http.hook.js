import {useState, useCallback} from 'react'


// хук для совервешения корректного запроса на сервер
export const useHttp = () => {

    // state
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // сам запрос с параметрами 
    const request = useCallback( async (url, method, body=null, headers={}) => {
        setLoading(true)
        try {

            // при наличии body приводим тип и задаем заголовок
            if (body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            // ожидание ответа на запрос
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()
            
            // проверка статуса ответа
            if(!response.ok){
                throw new Error(data.message || 'Smth going wrong')
            }
            setLoading(false)

            return data
        } catch (err) {
            setLoading(false)
            setError(err.message)
            throw err
        }
    }, [])

    // функция очистки стейта ошибки
    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError}
}