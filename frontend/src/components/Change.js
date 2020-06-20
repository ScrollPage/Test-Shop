import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd';
import * as Yup from 'yup'
import { LockOutlined } from '@ant-design/icons'
import { useFormik } from 'formik'
import { AuthContext } from '../context/auth/AuthContext'

const validationSchema = Yup.object().shape({
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

export const Change = () => {

    const { changePassword } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            console.log(values)
            changePassword(values.password)
            setSubmitting(true)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    return (
        <div className="change mt-4">
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="password"
                    hasFeedback
                    help={errorMessege(touched.password, errors.password)}
                    validateStatus={!touched.password ? null : errors.password ? "error" : "success"}
                >
                    <Input.Password
                        id="change__password"
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
                        id="change__confirmPassword"
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
                        Подтвердить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
