import React from 'react'
import { motion } from 'framer-motion'
// import { BasketContext } from '../context/basket/BasketContext'
import { Button } from 'antd'
import { BasketItem } from '../components/BasketItem' 

export const Basket = () => {

    // const { basket } = useContext(BasketContext)

    const renderSidebar = () => (
        <div className="basket-sidebar">
            <div className="total-price text-center">
                <h4>ИТОГО: 4800$</h4>
            </div>
            <Button className="mb-2">Вернуться в каталог</Button>
            <Button danger className="mb-2">Очистить корзину</Button>
            <Button type="primary" className="mb-2">Оформить заказ</Button>
        </div>
    )

    const data = [
        {
            key: 1,
            name: 'Apple IPhone 10',
            price: '1200$',
            amount: '1',
            description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Первую страна эта это проектах пустился, вскоре вершину осталось семантика себя предложения переписывается? Переулка, взобравшись.',
        },
        {
            key: 2,
            name: 'Apple IPhone 10',
            price: '1200$',
            amount: '1',
            description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Первую страна эта это проектах пустился, вскоре вершину осталось семантика себя предложения переписывается? Переулка, взобравшись.',
        },
        {
            key: 3,
            name: 'Apple IPhone 10',
            price: '1200$',
            amount: '1',
            description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Первую страна эта это проектах пустился, вскоре вершину осталось семантика себя предложения переписывается? Переулка, взобравшись.',
        },
        {
            key: 4,
            name: 'Apple IPhone 10',
            price: '1200$',
            amount: '1',
            description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Первую страна эта это проектах пустился, вскоре вершину осталось семантика себя предложения переписывается? Переулка, взобравшись.',
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container mt-3 basket">
                <div className="row">
                    <div className="col-md-9 mt">
                        <div className="basket-items">
                            <div className="basket-title">
                                <h4>4 ТОВАРА В КОРЗИНЕ</h4>
                            </div>
                            {data.map(item => (
                                <BasketItem key={item.key+item.name} data={item}/>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
