import { Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

import Home from "@pages/Home";
import Startup from "@pages/Startup";
import Investor from "@pages/Investor";

function PrivateRoute() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
}

export function AppRoutes() {
  // prettier-ignore
  return (
    <Suspense fallback={'Loading...'}>
      <Routes>
        <Route path='/'>
          <Route index                        element={<Home/>                        } />
          <Route element={<PrivateRoute/>}>
            <Route path="startup"               element={<Startup/>                     } />
            <Route path="investor"              element={<Investor/>                    } />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
