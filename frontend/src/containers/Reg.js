import React, { useContext } from 'react'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useReactRouter from 'use-react-router'
import { Form, Input, Button } from 'antd'
import { AuthContext } from '../context/auth/AuthContext'

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
        .required('Введите телефон'),
    password: Yup.string()
        .matches(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
            'Слишком легкий пароль'
        )
        .required('Введите пароль'),
    confirmPassword: Yup.string()
        .required('Введите пароль')
        .oneOf([Yup.ref("password"), null], 'Пароли должны совпадать')
})

const errorMessege = (touched, messege) => {
    if (!touched) {
        return
    }
    if (messege) {
        return messege
    }
}

export const Reg = () => {

    const { history } = useReactRouter()
    const { authRegister } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            number: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            authRegister(values.email, values.firstName, values.lastName, values.number, values.password)
            setSubmitting(true)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
                history.push('/')
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    return (
        <div className="reg" >
            <div>
                <div className="reg__top">
                    <h3>Зарегистрироваться</h3>
                    <p>Пожалуйста заполните данные</p>
                </div>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        hasFeedback
                        help={errorMessege(touched.email, errors.email)}
                        validateStatus={!touched.email ? null : errors.email ? "error" : "success"}
                    >
                        <Input
                            id="reg__email"
                            name="email"
                            placeholder="E-mail"
                            prefix={<MailOutlined />}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus={true}
                        />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        hasFeedback
                        help={errorMessege(touched.firstName, errors.firstName)}
                        validateStatus={!touched.firstName ? null : errors.firstName ? "error" : "success"}
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
                        validateStatus={!touched.lastName ? null : errors.lastName ? "error" : "success"}
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
                        validateStatus={!touched.number ? null : errors.number ? "error" : "success"}
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
                    <Form.Item
                        name="password"
                        hasFeedback
                        help={errorMessege(touched.password, errors.password)}
                        validateStatus={!touched.password ? null : errors.password ? "error" : "success"}
                    >
                        <Input.Password
                            id="reg__password"
                            name="password"
                            placeholder="Пароль"
                            prefix={<LockOutlined />}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        hasFeedback
                        help={errorMessege(touched.confirmPassword, errors.confirmPassword)}
                        validateStatus={!touched.confirmPassword ? null : errors.confirmPassword ? "error" : "success"}
                    >
                        <Input.Password
                            id="reg__confirmPassword"
                            name="confirmPassword"
                            placeholder="Повторите пароль"
                            prefix={<LockOutlined />}
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
                <Link to='/log'><p>Войти</p></Link>
            </div>
        </div>
    )
}