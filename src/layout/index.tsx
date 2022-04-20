import { memo, lazy } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const Home = lazy(() => import('@/pages/home'));
const Status = lazy(() => import('@/pages/status'));
const LayOut = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/status' element={<Status />}></Route>
    </Routes >
  </BrowserRouter >
}
export default memo(LayOut);