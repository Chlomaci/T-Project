import "./App.scss";
import MainPage from "./pages/MainPage";
import {FC} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router";
import { Button, Result } from 'antd';

const App: FC = () =>  {

  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/error" element={
                      <Result
                          status="404"
                          title="404"
                          subTitle="Извините, этой страницы не существует"
                          extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
                      />
                  } />
              </Routes>
          </BrowserRouter>
  );
}

export default App;
