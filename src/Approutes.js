import React, { Suspense } from "react";

import Homepage from "./Components/Views/Homepage";
import Login from "./Components/Login/Login";
import { Container, Spinner } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";

function Approutes() {
  return (
    <>
      <Container lg>
        <Suspense fallback={<Spinner color="primary" />}>
          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<Homepage />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
export default React.memo(Approutes);
