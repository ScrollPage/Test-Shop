import React from 'react'
import { ArrowRightOutlined } from '@ant-design/icons';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Img from '../assets/player.jpg'

export function Cases() {

    const caseText = [
        { id: 1, subtitle: 'Пунктуальность', title: 'Сильно подходящий к смыслу картинки текст', img: 'player' },
        { id: 2, subtitle: 'Забывчивость', title: 'Сильно подходящий к смыслу картинки текст', img: 'player' },
        { id: 3, subtitle: 'Потолок', title: 'Сильно подходящий к смыслу картинки текст', img: 'player' }
    ];

    return (
        <section className="cases">
            <div className="cont-fluid">
                <div className="cases-navigations">
                    <div className="cases-arrow prev disabled">
                        <ArrowLeftOutlined />
                    </div>
                    <div className="cases-arrow next">
                        <ArrowRightOutlined />
                    </div>
                </div>
                <div className="ro">
                    {caseText.map((caseItem) => (
                        <div className="case" key={caseItem.img + caseItem.id}>
                            <div className="case-details">
                                <span>{caseItem.subtitle}</span>
                                <h2>{caseItem.title}</h2>
                            </div>
                            <div className="case-image">
                                <img src={Img} alt={caseItem.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
