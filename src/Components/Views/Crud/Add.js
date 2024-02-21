import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import PropTypes from "prop-types";

import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CContainer,
} from "@coreui/react";

export default function PropertyForm({ after_submit }) {
  const [visible, setVisible] = useState(false);
  const [useTypeOptions, setUseTypeOptions] = useState([]);
  const [paymentTermOptions, setPaymentTermOptions] = useState([]);

  const { register, handleSubmit, control, reset } = useForm();
  const { get, post, response } = useFetch();

  async function fetchProperties() {
    const api = await get("/v1/admin/options");

    if (response.ok) {
      const propertyUseTypesOptions = Object.entries(
        api.property_use_types
      ).map((element) => ({
        value: element[1],
        label: element[0],
      }));

      const propertyPaymentTermsOptions = Object.entries(
        api.property_payment_terms
      ).map(([key, value]) => ({
        value: value,
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
      }));
      setPaymentTermOptions(propertyPaymentTermsOptions);
      setUseTypeOptions(propertyUseTypesOptions);
    }
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  async function onSubmit(data) {
    const apiResponse = await post(`/v1/admin/premises/properties`, {
      property: data,
    });
    console.log("jhjh");

    if (response.ok) {
      console.log("jhjh");
      toast("Property added successfully");
      setVisible(!visible);
      after_submit();
      reset();
    } else {
      console.log("jhjh");

      toast(apiResponse.data?.message);
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn s-3 custom_theme_button"
        data-mdb-ripple-init
        onClick={() => setVisible(!visible)}
      >
        Add Property
      </button>
      <CModal
        alignment="center"
        size="xl"
        visible={visible}
        backdrop="static"
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">
            Add Property Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col className="pr-1 mt-3" md="6">
                  <Form.Group>
                    <label>Name</label>
                    <Form.Control
                      required
                      placeholder="Full Name"
                      type="text"
                      {...register("name", { required: " Name is required." })}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pr-1 mt-3" md="6">
                  <Form.Group>
                    <label>City</label>
                    <Form.Control
                      type="text"
                      {...register("city")}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1 mt-3" md="12">
                  <Form.Group>
                    <label>Use Type</label>
                    <Controller
                      name="use_type"
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={useTypeOptions}
                          value={useTypeOptions.find(
                            (c) => c.value === field.value
                          )}
                          onChange={(val) => field.onChange(val.value)}
                        />
                      )}
                      control={control}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1 mt-3" md="12">
                  <Form.Group>
                    <label>Payment Term</label>
                    <Controller
                      name="payment_term"
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={paymentTermOptions}
                          value={paymentTermOptions.find(
                            (c) => c.value === field.value
                          )}
                          onChange={(val) => field.onChange(val.value)}
                        />
                      )}
                      control={control}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center">
                <CModalFooter>
                  <Button
                    data-mdb-ripple-init
                    type="submit"
                    className="btn  btn-primary btn-block custom_theme_button"
                  >
                    Submit
                  </Button>
                  <CButton
                    className="custom_grey_button"
                    color="secondary "
                    style={{ border: "0px", color: "white" }}
                    onClick={() => setVisible(false)}
                  >
                    Close
                  </CButton>
                </CModalFooter>
              </div>
            </Form>
            <div className="clearfix"></div>
          </CContainer>
        </CModalBody>
      </CModal>
    </div>
  );
}

PropertyForm.propTypes = {
  after_submit: PropTypes.func,
};
