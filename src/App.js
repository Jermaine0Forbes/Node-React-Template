import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Study from "./pages/Study";
import Test from "./pages/Test";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Delete from "./pages/Delete";
import List from "./pages/List";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthProvider from "./pages/AuthProvider";

const MyTheme = React.createContext(null);
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
                  <Route path="create" element={<Create />} />
                  <Route path="study" element={<Study />} />
                  <Route path="test" element={<Test />} />
                  <Route path="account" element={<Account />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="delete" element={<Delete />} />
                  <Route path="list" element={<List />} />
                  <Route path="*" element={<NotFound />} />
                  <Route exact path="/user/:id" element={<Profile/>} />
                </Route>
              </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
      )


}

