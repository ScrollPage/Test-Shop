import React, { useContext, useEffect } from 'react'
import { ItemsContext } from '../context/items/ItemsContext'
import { useRouteMatch } from 'react-router-dom'
import { Form, Input, Button, TextArea } from 'antd';
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

export const Edit = () => {

    const { fetchItemById, item, loading, flag, changeItem } = useContext(ItemsContext)
    const match = useRouteMatch('/edit/:id')

    useEffect(() => {
        fetchItemById(match.params.id)
        // eslint-disable-next-line
    }, [match.params.id, flag])

    const initialValues = {
        name: "false",
        price: "false",
        description: "false"
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            console.log(values)
            changeItem(
                item.id,
                values.name !== "false" ? values.name : item.name, 
                values.price !== "false" ? values.price : item.price, 
                values.description !== "false" ? values.description : item.description, 
                )
            setSubmitting(true)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    return (
        <div className="edit mt-4">
            {loading 
                ? <p>Загрузка...</p>
                : <>
                    <h4>Редактирование товара с id =&nbsp;{item.id}</h4>
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            name="name"
                            hasFeedback
                            help={errorMessege(touched.name, errors.name)}
                            validateStatus={errors.name ? "error" : "success"}
                            initialValue={item.name}
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
                            validateStatus={errors.price ? "error" : "success"}
                            initialValue={item.price}
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
                            validateStatus={errors.description ? "error" : "success"}
                            initialValue={item.description}
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
                </>
            }
        </div>
    )
}
