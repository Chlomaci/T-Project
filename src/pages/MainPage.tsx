import {createContext, FC, useEffect, useState} from "react";
import Header from "../components/Header";
import ProductsAll from "../components/ProductsAll";
import './MainPage.scss'
import PageContent from "../components/PageContent";
import CartPage from "./CartPage";
import {IProduct} from "../services/fakestore";
import ModalComponent from "../components/Modal";


export const Context = createContext();

const MainPage: FC = () => {

    const [cartPage, setCartPage] = useState(false)
    const [cartProducts, setCartProducts] = useState<IProduct[]>([])

    // modal

    const [modal, setModal]: boolean = useState(false)

    const openModal = () => {
        setModal(true)
    }

    useEffect(() => {
        const modalId = setTimeout(openModal, 3000)

        return () => clearTimeout(modalId)
    }, [])



    return(
     <>
         {modal ? <ModalComponent props={{modal, setModal}}/> : null}
         <Context.Provider value={{setCartPage, cartProducts, setCartProducts}}>
             <Header/>
             <PageContent>
                 {cartPage ? <CartPage/> : <ProductsAll/>}
             </PageContent>
         </Context.Provider>
     </>
 )
}

export default MainPage