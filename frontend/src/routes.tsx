import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "@pages/Home";


export function AppRoutes() {
  // prettier-ignore
  return (
    <Suspense fallback={'Loading...'}>
      <Routes>
        <Route path='/'>
          <Route index                        element={<Home/>                        } />
        </Route>
      </Routes>
    </Suspense>
  )
}
