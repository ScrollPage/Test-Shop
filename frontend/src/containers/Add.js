import React, { useContext } from 'react'
import { ItemsContext } from '../context/items/ItemsContext'
import { useRouteMatch } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import * as Yup from 'yup'
import { useFormik } from 'formik'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Введите название товара'),
    price: Yup.string()
        .required('Введите цену товара'),
    description: Yup.string()
        .required('Введите описание товара'),
})

const errorMessege = (touched, messege) => {
    if (!touched) {
        return
    }
    if (messege) {
        return messege
    }
}

export const Add = () => {

    const { addItem } = useContext(ItemsContext)

    const formik = useFormik({
        initialValues: {
            name: "false",
            price: "false",
            description: "false"
        },
        validationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            setSubmitting(true)
            addItem(values)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    return (
        <div className="edit mt-4">
            <h4>Добавление товара</h4>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    hasFeedback
                    help={errorMessege(touched.name, errors.name)}
                    validateStatus={!touched.email ? null : errors.name ? "error" : "success"}
                >
                    <Input
                        id="edit__name"
                        name="name"
                        placeholder="Название"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    hasFeedback
                    help={errorMessege(touched.price, errors.price)}
                    validateStatus={!touched.email ? null : errors.price ? "error" : "success"}
                >
                    <Input
                        id="edit__price"
                        name="price"
                        placeholder="Цена"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    hasFeedback
                    help={errorMessege(touched.description, errors.description)}
                    validateStatus={!touched.email ? null : errors.description ? "error" : "success"}
                >
                    <Input.TextArea
                        id="edit__description"
                        name="description"
                        placeholder="Описание"
                        value={values.description}
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
        </div >
    )
}
