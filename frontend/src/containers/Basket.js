import React from 'react'
import { motion } from 'framer-motion'
// import { BasketContext } from '../context/basket/BasketContext'
import { Button, Table } from 'antd'

export const Basket = () => {

    // const { basket } = useContext(BasketContext)

    const renderSidebar = () => (
        <>
            <Button className="mb-2">Вернуться в каталог</Button>
            <Button danger className="mb-2">Очистить корзину</Button>
            <Button type="primary" className="mb-2">Оплатить</Button>
            <div className="total-price mt-3 text-center">
                <h4>Итого: 4800$</h4>
            </div>
        </>
    )

    const columns = [
        { title: 'Название', dataIndex: 'name', key: 'name' },
        { title: 'Цена', dataIndex: 'price', key: 'price' },
        { title: 'Кол-во', dataIndex: 'amount', key: 'amount' },
        {
            title: 'Из корзины',
            dataIndex: '',
            key: 'x',
            render: () => <a>Убрать</a>
        },
    ];

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
                    <div className="col-md-9">
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>
                                // rowExpandable: record => record.name !== 'Not Expandable',
                            }}
                            dataSource={data}
                        />
                    </div>
                    <div className="col-md-3 mt-4 mb-4">
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
