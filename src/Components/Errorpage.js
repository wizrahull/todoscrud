import React from "react";
import { NavLink } from "react-router-dom";

export default function Errorpage() {
  return (
    <div className="d-flex align-items-center justify-content-center  mt-5 p-5">
      <div className="text-center row">
        <div className=" col-md-12 mt-5 ">
          <p className="5">
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you`re looking for doesn`t exist.</p>
        </div>
        <NavLink to="/homepage" className="bg-danger p-2 rounded-2">
          GO HOME
        </NavLink>
      </div>
    </div>
  );
}
