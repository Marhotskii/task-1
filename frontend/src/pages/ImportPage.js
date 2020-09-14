import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'



export const ImportPage = () => {

    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        filename : ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const importHandler = async () => {
        try {
            const data = await request('/api/main/import',
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
                        <span className="card-title">Импорт файлов в MySql</span>
                    </div>

                    <div style={{margin : 10}}>
                        <div className="input-field ">
                            <span>Выберите файл из папки files</span>
                            <hr></hr>
                            <input 
                                id="filename" 
                                type="file" 
                                name='filename'
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    
                    <div className="card-action">
                        <button 
                            className='btn yellow darken-4'
                            onClick={importHandler}
                            disabled={loading}
                        >
                            Импортировать
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}