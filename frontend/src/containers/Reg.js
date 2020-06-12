import React from 'react'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useReactRouter from 'use-react-router'
import { motion } from 'framer-motion'
import axios from 'axios'
// import CSRFToken from '../hoc/csrftoken'
import { Form, Input, Button } from 'antd'
// import { AlertContext } from '../context/alert/AlertContext'

// import setGlobalCSRF from 'helpers/setGlobalCSRF';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Некорректный E-mail')
        .required('Введите E-mail'),
    username: Yup.string()
        .matches(
            '^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$',
            'Только строчные и прописные, первый символ буква'
        )
        .required('Введите логин'),
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
    // const { show } = useContext(AlertContext)

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            onRegister(values.email, values.password, values.username)
            setSubmitting(true)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
                history.push('/')
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    const onRegister = async (email, password, username) => {
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'
        // $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        // try {
            // firebase.register(email, password, username)
            // const response = axios.post("http://localhost:8000/account/register", {email, password, username}, {credentials: true})
            // console.log(response.data)
            axios.post("http://localhost:8000/account/register", {
                email, password, username
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
        // } catch (e) {
            // show('Что-то пошло не так!', 'success')
        // }
    }

    return (
        <motion.div
            className="reg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
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
                        name="username"
                        hasFeedback
                        help={errorMessege(touched.username, errors.username)}
                        validateStatus={!touched.username ? null : errors.username ? "error" : "success"}
                    >
                        <Input
                            id="reg__username"
                            name="username"
                            placeholder="Логин"
                            prefix={<UserOutlined />}
                            value={values.username}
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
                    {/* <CSRFToken /> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
                <Link to='/log'><p>Войти</p></Link>
            </div>
        </motion.div>
    )
}