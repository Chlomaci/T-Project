import {FC, useCallback, useContext, useEffect} from "react";
import './ProductsAll.scss'
import {useGetProductsQuery} from "../services/fakestore";
import {Context} from "../pages/MainPage";
import ProductCard from "./ProductCard";
import {Button} from "antd";


const ProductsAll: FC = () => {


    const {cartProducts, setCartProducts} = useContext(Context)
    const { data:products, error, isLoading, refetch } = useGetProductsQuery(10);


    useEffect(() => {
      // products ? setCartProducts(products) : null
        if (products) {
            console.log('products effect!')
            setCartProducts(products)

        } else {
            console.log('no products')
        }
    }, [products])

    const handleBuyProduct = useCallback((product, cartProducts, setCartProducts, calculatedSum) => {
        const productIndex = cartProducts.findIndex(e => e.id === product.id);
        const newCart = cartProducts.map((e, i) => i === productIndex ? {...e, quantity: e.quantity + 1, totalSum: calculatedSum} : e);
        setCartProducts(newCart)
    }, [])


    const onRefetch = () => {
        refetch()
    }



    return (
        <>
            {isLoading ? 'loading' : error ? 'error' :
                <section className='productsList'>
                    <Button onClick={onRefetch} type='primary' style={{marginBottom: '10px'}}>Обновить все!</Button>
                    <ul className='products__all'>
                        {cartProducts.map(product => {
                            return <ProductCard key={product.id} product={product} handleBuyProduct={handleBuyProduct}/>
                        })}
                    </ul>
                </section>

            }

        </>

    )
}

export default ProductsAll
