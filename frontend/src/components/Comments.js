import React, { Fragment, useState } from 'react'
import StarRatings from 'react-star-ratings'
import { Modal } from './Modal'
import { Button } from 'antd';
import * as R from 'ramda'

export const Comments = ({ item }) => {

    const [modal, setModal] = useState(false)

    return (
        <>
            {modal && <Modal setModal={setModal} item={item} />}
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
                                        <p>{R.slice(0, 10, comment.date_commented)}&nbsp;{R.slice(11, 16, comment.date_commented)}</p>
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
