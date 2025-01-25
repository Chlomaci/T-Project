import './Header.scss'
import {Menu} from 'antd';
import {FC, useContext} from "react";
import { ShoppingCartOutlined } from '@ant-design/icons';
import {Link} from "react-router";
import {Context} from "../pages/MainPage";


const Header: FC = () => {

    const {cartPage, setCartPage} = useContext(Context)

 return(
     <header>
         <Menu
             theme="dark"
             mode="horizontal"
             style={{ flex: 1, minWidth: 0, minHeight: 70, fontSize: 22, justifyContent: 'center', alignItems: 'center' }}>
             <Menu.Item key='1'>
                     <button className='menuBtn' onClick={() => {
                         setCartPage(false)
                         console.log(cartPage)
                     }}>
                         Главная
                     </button>
             </Menu.Item>
             <Menu.Item key='2'>
                 <Link to='/error'>
                     <button className='menuBtn' onClick={() => setCartPage(false)}>
                         Здесь ошибка
                     </button>
                 </Link>
             </Menu.Item>
             <Menu.Item key='3'>
                 <button onClick={() => setCartPage(true)}>
                     <ShoppingCartOutlined  size={48} style={{ color: 'white', fontSize: '26px'}}/>
                 </button>
             </Menu.Item>
         </Menu>

     </header>
 )
}

export default Header;