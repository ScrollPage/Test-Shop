import React, { useContext } from 'react'
import { ItemsContext } from '../context/items/ItemsContext'
import { Form, Input, Button, Radio } from 'antd';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useReactRouter from 'use-react-router'

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

    const { history } = useReactRouter()
    const { addItem } = useContext(ItemsContext)

    const formik = useFormik({
        initialValues: {
            name: "false",
            price: "false",
            description: "false",
            category: '1'
        },
        validationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            setSubmitting(true)
            addItem(values, values.category)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
                history.push("/admin")
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    return (
        <div className="edit mt-4">
            <h4>Добавление товара</h4>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="category"
                    initialValue="1"
                >
                    <Radio.Group value={values.category} onChange={handleChange} id="edit_category" name="category"> 
                        <Radio.Button value="1">Apple</Radio.Button>
                        <Radio.Button value="2">Samsung</Radio.Button>
                        <Radio.Button value="3">HTC</Radio.Button>
                        <Radio.Button value="4">Lenovo</Radio.Button>
                        <Radio.Button value="5">Nokia</Radio.Button>
                    </Radio.Group>
                </Form.Item>
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
