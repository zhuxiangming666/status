import { Suspense } from 'react';
import { memo,lazy } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const Home = lazy(() => import('@/pages/home'));
const Status = lazy(() => import('@/pages/status'));
// import Home from '@/pages/home';
// import Status from '@/pages/status';
const LayOut = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Suspense fallback={<div>loading...</div>}><Home /></Suspense>}></Route>
      <Route path='/status' element={<Suspense fallback={<div>loading...</div>}><Status /></Suspense>} ></Route>
    </Routes >
  </BrowserRouter >
}
export default memo(LayOut);