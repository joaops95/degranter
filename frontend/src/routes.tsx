import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import Startup from "@pages/Startup";
import Investor from "@pages/Investor";

export function AppRoutes() {
  // prettier-ignore
  return (
    <Suspense fallback={'Loading...'}>
      <Routes>
        <Route path='/'>
          <Route index                        element={<Home/>                        } />
          <Route path="startup"               element={<Startup/>                     } />
          <Route path="investor"              element={<Investor/>                    } />
        </Route>
      </Routes>
    </Suspense>
  )
}
