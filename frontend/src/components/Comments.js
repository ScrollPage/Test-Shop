import React, { Fragment, useState, useContext } from 'react'
import StarRatings from 'react-star-ratings'
import { CloseOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { AlertContext } from '../context/alert/AlertContext'

export const Comments = ({ item }) => {

    const [modal, setModal] = useState(false)

    // const [name, setName] = useState('sdfsdf')
    // const [email, setEmail] = useState('')
    const { show } = useContext(AlertContext)

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const validateMessages = {
        required: 'Поле не заполнено!'
    };

    const onFinish = values => {
        console.log(values);
        setTimeout(() => {
            document.body.style.overflowY = 'scroll'
            setModal(false)
            show('Ваш комментраий успешно добавлен!', 'success')
        }, 500)

    };


    const renderModel = () => (
        <div className="fixed-overlay">
            <div className="comments-modal">
                <div className="comments-closed" onClick={() => { document.body.style.overflowY = 'scroll'; setModal(false) }}>
                    <CloseOutlined />
                </div>
                <div className="comments-container">
                    <h4>Оставить отзыв</h4>
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
                    {[0, 1, 2, 3].map(comment => (
                        <Fragment key={comment}>
                            <div className="comment">
                                <div className="comment-info">
                                    <p>КИРИЛЛ</p>
                                    <p>18.06.2020 21.32</p>
                                    <StarRatings
                                        rating={4}
                                        starRatedColor="gold"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="1px"
                                    />
                                </div>
                                <div className="comment-text">
                                    <p>Осталась довольна покупкой. Много функций, возможностей, хорошо выглядит. Решила попробовать, чем все на улице дымят, оказалось, что очень похоже на карманный кальян (кто устал распинать угли и собирать кальяны в домашних условиях - отличное решение).
                                    Конечно, в руководстве не написано, как правильно им пользоваться, так что смотрите видео на YouTube, не забывайте нажимать на кнопку при затяжке. Перед самым первым употреблением, смачивайте испаритель ароматической жидкостью, чтоб не сгорел.
                                    Приятно порадовала цена на данном сайте, потому что на других сайтах и в магазинах стоит дороже.</p>
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
