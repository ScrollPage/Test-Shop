import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext'
import { Form, Input, Button } from 'antd';
import store from 'store'
import * as Yup from 'yup'
import { UserOutlined, MailOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons'
import { useFormik } from 'formik'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Некорректный E-mail')
        .required('Введите E-mail'),
    firstName: Yup.string()
        .min(3, 'Слишком короткое имя')
        .required('Введите имя'),
    lastName: Yup.string()
        .min(3, 'Слишком короткая фамилия')
        .required('Введите фамилию'),
    number: Yup.string()
        .min(11, 'Короткий номер телефона')
        .max(11, 'Слишком длинный номер телефона')
        .required('Введите телефон')
})

const errorMessege = (touched, messege) => {
    if (!touched) {
        return
    }
    if (messege) {
        return messege
    }
}

export const Info = () => {

    const { changeAccount, fetchAccount, email, firstName, lastName, number, loading } = useContext(AuthContext)

    useEffect(() => {
        fetchAccount()
        // eslint-disable-next-line
    }, [email, firstName, lastName, number])

    const initialValues = {
        email: `${email}`,
        firstName:  `${firstName}`,
        lastName: `${lastName}`,
        number:  `${number}`
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log(values)
            changeAccount(values.email, values.firstName, values.lastName, values.number)
            setSubmitting(true)
            setTimeout(() => {
                setSubmitting(false)
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    return (
        loading || email !== store.get('email')
            ? <p>Загрузка...</p>
            : <div className="info mt-4">
                <Form onFinish={handleSubmit} values={values}>
                    <Form.Item
                        name="email"
                        hasFeedback
                        help={errorMessege(touched.email, errors.email)}
                        validateStatus={errors.email ? "error" : "success"}
                        initialValue={email}
                    >
                        <Input
                            id="reg__email"
                            name="email"
                            placeholder="E-mail"
                            prefix={<MailOutlined />}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        hasFeedback
                        help={errorMessege(touched.firstName, errors.firstName)}
                        validateStatus={errors.firstName ? "error" : "success"}
                        initialValue={firstName}
                    >
                        <Input
                            id="reg__firstName"
                            name="firstName"
                            placeholder="Имя"
                            prefix={<UserOutlined />}
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        hasFeedback
                        help={errorMessege(touched.lastName, errors.lastName)}
                        validateStatus={errors.lastName ? "error" : "success"}
                        initialValue={lastName}
                    >
                        <Input
                            id="reg__lastName"
                            name="lastName"
                            placeholder="Фамилия"
                            prefix={<TeamOutlined />}
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        name="number"
                        hasFeedback
                        help={errorMessege(touched.number, errors.number)}
                        validateStatus={errors.number ? "error" : "success"}
                        initialValue={number}
                    >
                        <Input
                            id="reg__number"
                            name="number"
                            placeholder="Телефон"
                            prefix={<PhoneOutlined />}
                            value={values.number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                            Сменить данные
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
}
