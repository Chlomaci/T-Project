
import { Card, Button, Flex } from 'antd';
const { Meta } = Card;
import {FC, useContext, useMemo} from "react";
import {Context} from "../pages/MainPage";



const ProductCard:FC = ({product, handleBuyProduct}) => {
    const {cartProducts, setCartProducts} = useContext(Context)
    console.log(product)

    const calculatedSum = useMemo(() => {
        return product.totalSum + product.price
    }, [product])

    return (
        <li style={{listStyle: 'none'}} key={product.id}>
            <Card
                style={{ width: 400 }}
            >
                <Meta title={product.title} description={
                    <Flex vertical gap="middle">
                        <div className="product__descr">{product.description}</div>
                        <div className="product__price">Цена (руб): {product.price}</div>
                        {product.quantity > 0 ?
                            <>
                                <div className="product__price">Количество (шт): {product.quantity}</div>
                                <div className="product__price">Всего сумма (руб): {product.totalSum}</div>
                            </>
                            : null}
                        <Button onClick={() => handleBuyProduct(product, cartProducts, setCartProducts, calculatedSum)} style={{width: '50%', fontSize: 16, background: '#001d66', color: 'white'}}>Купить</Button>
                    </Flex>
                } />
            </Card>
        </li>
    )
}


export default ProductCard