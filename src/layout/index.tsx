import { memo, lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const Home = lazy(() => import('@/pages/home'));
const LayOut = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Suspense fallback={<div>loading...</div>}><Home /></Suspense>}></Route>
    </Routes >
  </BrowserRouter >
}
export default memo(LayOut);