import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const ConcatPage = () => {

    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        substr : '',
        filename: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const concatHandler = async () => {
        try {
            const data = await request('/api/main/concat',
                'POST',
                {...form}
            )
            message(data.message)
        } catch (err) {}
    }


    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <div className="card ">
                    <div className="card-content black-text">
                        <span className="card-title">Конкатенация файлов</span>
                    </div>

                    <div style={{margin : 10}}>
                        <div className="input-field ">
                            <input 
                                placeholder="Подстрока для удаления файлов" 
                                id="substr" 
                                type="text" 
                                name='substr'
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="input-field ">
                            <input 
                                placeholder="Название скокатенированного файла" 
                                id="filename" 
                                type="text" 
                                name='filename'
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    
                    <div className="card-action">
                        <button 
                            className='btn yellow darken-4'
                            onClick={concatHandler}
                            disabled={loading}
                        >
                            Сконкатенировать
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}