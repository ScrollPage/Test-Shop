import React, { useContext } from 'react'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useReactRouter from 'use-react-router'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Form, Input, Button } from 'antd'
import { AlertContext } from '../context/alert/AlertContext'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Некорректный E-mail')
        .required('Введите E-mail'),
    password: Yup.string()
        .matches(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
            'Слишком легкий пароль'
        )
        .required('Введите пароль')
})

const errorMessege = (touched, messege) => {
    if (!touched) {
        return
    }
    if (messege) {
        return messege
    }
}

export const Log = () => {

    const { history } = useReactRouter()
    const { show } = useContext(AlertContext)

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            onLogin(values.email, values.password)
            setSubmitting(true)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
                history.push('/')
                show('Вы успешно зашли!', 'success')
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    const onLogin = async (email, password) => {
        axios.post("http://localhost:8000/account/login", {
            username: email, password
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <motion.div
            className="log"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div>
                <div className="log__top">
                    <h3>Войти в аккаунт</h3>
                    <p>Пожалуйста войдите в свой аккаунт</p>
                </div>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        hasFeedback
                        help={errorMessege(touched.email, errors.email)}
                        validateStatus={!touched.email ? null : errors.email ? "error" : "success"}
                    >
                        <Input
                            id="log__email"
                            name="email"
                            size="large"
                            placeholder="E-mail"
                            prefix={<MailOutlined />}
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus={true}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        help={errorMessege(touched.password, errors.password)}
                        validateStatus={!touched.password ? null : errors.password ? "error" : "success"}
                    >
                        <Input.Password
                            id="log__password"
                            name="password"
                            size="large"
                            placeholder="Пароль"
                            prefix={<LockOutlined />}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" size="large" disabled={isSubmitting}>
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                </Form>
                <Link to='/reg'><p>Зарегистрироваться</p></Link>
            </div>
        </motion.div>
    )
}