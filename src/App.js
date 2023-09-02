import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider} from 'react-query';
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Test from "./pages/Test";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import List from "./pages/List";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      staleTime:100,
    }
  }
});

export default function App()
{
    
    return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                    <Route path="create" element={
                      <ProtectedRoute level={2}>
                        <Create />
                      </ProtectedRoute>
                  } />
                  <Route path="test" element={<Test />} />
                  <Route path="account" element={<Account />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="list" element={<List />} />
                  <Route path="/user/:id" element={<Profile/>} />
                  <Route path="/forbidden" element={<Forbidden />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
      )


}

