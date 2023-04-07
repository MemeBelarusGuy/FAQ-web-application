import Container from "@mui/material/Container";
import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom'
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { PopularPosts } from "./pages/PopularPosts";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  },[])
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/popular' element={<PopularPosts />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
