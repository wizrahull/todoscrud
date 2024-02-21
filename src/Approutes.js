import React, { Suspense } from "react";

import Homepage from "./Components/Views/Homepage";
import Login from "./Components/Login./Login";
import { Container, Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Errorpage from "./Components/Errorpage";

function Approutes() {
  return (
    <>
      <Container>
        <Suspense fallback={<Spinner color="primary" />}>
          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
export default React.memo(Approutes);
