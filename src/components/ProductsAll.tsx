import {FC, useCallback, useContext, useEffect, useMemo} from "react";
import './ProductsAll.scss'
import {useGetProductsQuery} from "../services/fakestore";
import {Context} from "../pages/MainPage";
import ProductCard from "./ProductCard";
import {Button} from "antd";


const ProductsAll: FC = () => {


    const {cartProducts, setCartProducts} = useContext(Context)
    const { data: products, error, isLoading, refetch } = useGetProductsQuery(10);

    const handleSortProducts = useMemo(() => {
        if (products) {
            return [...products].sort((a, b) => a.title.localeCompare(b.title))
        } return

    }, [products])

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

    const onSort = () => {
        const sortedProducts = handleSortProducts;
        setCartProducts(sortedProducts)
    }



    return (
        <>
            {isLoading ? 'loading' : error ? 'error' :
                <section className='productsList'>
                    <Button onClick={onRefetch} type='primary' style={{marginBottom: '10px', marginRight: '10px'}}>Обновить все!</Button>
                    <Button onClick={onSort} type='primary' style={{marginBottom: '10px'}}>Отсортируем все! (по наименованию)</Button>
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
