import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../Auth/AuthModule";

import useFetch from "use-http";

export default function () {
  const { register, handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const { authUser, setAuthUser, isLogged, setIslogged } = useAuth();

  const handleForm = (data) => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/admin/auth/session`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        localStorage.setItem("token", resJson.token);
        localStorage.setItem("user", JSON.stringify(resJson.object));
        setIslogged(true);
        setAuthUser(resJson.object);
        navigate("/homepage");
        console.log(resJson);
        toast("Logged In");
      })
      .catch((error) => {
        if (!("json" in error) || error.status == 404) {
          toast("Unknown Error Occured. Server response not received.");

          return;
        }
        error.json().then((response) => {
          toast(response.message);
        });
      });
  };

  return (
    <div className=" d-flex justify-content-center  text-light mt-5  ">
      <Card className="mt-4 p-3 shadow-5-strong bg-secondary">
        <Form onSubmit={handleSubmit(handleForm)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("username")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}
