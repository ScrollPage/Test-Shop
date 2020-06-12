import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

export function Body() {
    return (
       <section className="body">
            <div className="cont">
                <div className="ro">
                    
                    <h2>
                        <div className="line">
                            <span>Вдохновляющий текст</span>
                        </div>
                        <div className="line">
                            <span>Красивая поднадпись</span>
                        </div>
                    </h2>
                    <div className="btn-row">
                        <Link to="/items">
                            Подробнее <ArrowRightOutlined />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
