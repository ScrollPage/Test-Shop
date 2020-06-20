import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext'
import { Form, Input, Button } from 'antd';
import store from 'store'

export const Info = () => {

    const { changeAccount, fetchAccount, email, firstName, lastName, number } = useContext(AuthContext)

    useEffect(() => {
        fetchAccount()
        // eslint-disable-next-line
    }, [email, firstName, lastName, number])

    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 },
    };

    const validateMessages = {
        required: 'Поле не заполнено!',
        // len:'Длина должна быть 11 символов',
        types: {
            // email: 'Некорректный E-mail!',
            // number: 'Некорректное число'
        }
    };

    const onFinish = values => {
        console.log(values);
        changeAccount(values.email, values.firstName, values.lastName, values.number)
        // setTimeout(() => {
        // show('Вы успешно сменили данные!', 'success')
        // }, 500)
    };

    return (
        email === store.get('email') && 
    <div className="info mt-4">
        <Form name="nest-messages" {...layout} onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={'email'} label="E-mail" rules={[{ type: 'email', message: 'Некорректный E-mail!'}]} initialValue={email}>
                <Input />
            </Form.Item>
            <Form.Item name={'firstName'} label="Имя" rules={[{ required: true }]} initialValue={firstName}>
                <Input />
            </Form.Item>
            <Form.Item name={'lastName'} label="Фамилия" rules={[{ required: true }]} initialValue={lastName}>
                <Input />
            </Form.Item>
            <Form.Item name={'number'} label="Номер" rules={[{ required: true }]} initialValue={number}>
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Сменить данные
                </Button>
            </Form.Item>
        </Form>
    </div>
    )
}
