import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const GeneratePage = () => {

    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        numFiles : 0,
        numStr : 0
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const generateHandler = async () => {
        try {
            const data = await request('/api/main/generate',
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
                        <span className="card-title">Генерация файлов</span>
                    </div>

                    <div style={{margin : 10}}>
                        <div className="input-field ">
                            <input 
                                placeholder="Количество файлов" 
                                id="numFiles" 
                                type="number" 
                                name='numFiles'
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="input-field ">
                            <input 
                                placeholder="Количество строк в файле" 
                                id="numStr" 
                                type="number" 
                                name='numStr'
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    
                    <div className="card-action">
                        <button 
                            className='btn yellow darken-4'
                            onClick={generateHandler}
                            disabled={loading}
                        >
                            Сгенерировать
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}