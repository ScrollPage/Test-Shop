import React, { Fragment, useState, useContext } from 'react'
import StarRatings from 'react-star-ratings'
import { CloseOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { AlertContext } from '../context/alert/AlertContext'
import { ItemsContext } from '../context/items/ItemsContext'

export const Comments = ({ item }) => {

    const [modal, setModal] = useState(false)
    const [rating, setRating] = useState(0)

    // const [name, setName] = useState('sdfsdf')
    // const [email, setEmail] = useState('')
    const { show } = useContext(AlertContext)
    const { setComment } = useContext(ItemsContext)

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const validateMessages = {
        required: 'Поле не заполнено!'
    };

    const onFinish = values => {
        console.log(values);
        setComment(item.id, values.name, rating, values.introduction)
        setTimeout(() => {
            document.body.style.overflowY = 'scroll'
            setModal(false)
            show('Ваш комментраий успешно добавлен!', 'success')
        }, 500)
    };

    const changeRating = (newRating, name) => {
        setRating(newRating)
    }

    const renderModel = () => (
        <div className="fixed-overlay">
            <div className="comments-modal">
                <div className="comments-closed" onClick={() => { document.body.style.overflowY = 'scroll'; setModal(false) }}>
                    <CloseOutlined />
                </div>
                <div className="comments-container">
                    <h4>Оставить отзыв</h4>
                    <div className="comments-rating">
                        <StarRatings
                            rating={rating}
                            starRatedColor="gold"
                            starHoverColor="gold"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                            starDimension="20px"
                            starSpacing="1px"
                        />
                    </div>
                    <Form name="nest-messages" {...layout} onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={'name'} label="Имя" rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item name={'introduction'} label="Отзыв" rules={[{ required: true, max: 400 }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
                            <Button type="primary" htmlType="submit">
                                Отправить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {modal && renderModel()}
            <div className="comments">
                <div className="comments-header">
                    {item && <h4>Отзывы о товаре&nbsp;{item.name}</h4>}
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => { document.body.style.overflow = 'hidden'; setModal(true) }}
                    >ОСТАВИТЬ ОТЗЫВ</Button>
                </div>
                <div className="comments-new">
                </div>
                <div className="comments-body">
                    <hr />
                    {item && item.comments
                        .map(comment => (
                            <Fragment key={comment + comment.first_name}>
                                <div className="comment">
                                    <div className="comment-info">
                                        <p>{comment.first_name}</p>
                                        <p>{comment.date_commented}</p>
                                        <StarRatings
                                            rating={comment.rating}
                                            starRatedColor="gold"
                                            starHoverColor="gold"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="20px"
                                            starSpacing="1px"
                                        />
                                    </div>
                                    <div className="comment-text">
                                        <p>{comment.description}</p>
                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))}
                </div>
            </div>
        </>
    )
}
