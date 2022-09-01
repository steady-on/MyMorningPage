import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Write from "../pages/Write";
import Detail from "../pages/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="write" element={<Write />} />
        <Route path="detail" element={<Detail />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
