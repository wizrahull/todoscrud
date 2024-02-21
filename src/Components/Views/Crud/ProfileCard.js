import React, { useEffect, useState } from 'react'
import useFetch from 'use-http'
import "../scss/_custom.scss";
import "../scss/style.scss";
import "../scss/_variables.scss";
import "../scss/_add.scss";
import "../scss/_roles.scss";
import Add from './Add'
import { Dropdown } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { BsThreeDots } from 'react-icons/bs'
import Paginate from '../components/Pagination'
import Loading from '../components/loading/loading'
import CustomDivToggle from '../components/CustomDivToggle'
import { CNavbar, CContainer, CNavbarBrand, CForm, CFormInput, CButton } from '@coreui/react'
import Show from './Show'
import Edit from './Edit'
// ProfileCard.js

import React, { useState, useEffect } from "react";
import useFetch from "use-http";
import "../scss/_custom.scss";
import "../scss/style.scss";
import "../scss/_variables.scss";
// import './scss/_layout.scss';
import "../scss/_add.scss";
import "../scss/_roles.scss";
import { BsThreeDots } from "react-icons/bs";
import Loading from "../components/loading/loading";
import { Row, Col, Dropdown } from "react-bootstrap";
import Paginate from "../components/Pagination";
import { useParams } from "react-router-dom";

import { CNavbar, CContainer, CNavbarBrand } from "@coreui/react";
import CustomDivToggle from "../components/CustomDivToggle";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";

function ProfileCard() {
  const { get, response, error } = useFetch()

  useEffect(() => {}, [])
  const [units, setUnits] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const [properties, setProperties] = useState([])
  const [pagination, setPagination] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [refresh, setRefresh] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadInitialProperties = async (searchTerm = '') => {
    let endpoint = `/v1/admin/premises/properties?page=${currentPage}&search=${searchTerm}`

    const initialProperties = await get(endpoint)
    if (response.ok) {
      setLoading(false)
      setProperties(initialProperties.data)
      setPagination(initialProperties.pagination)
    } else {
      setErrors(true)
      setLoading(false)
  async function loadInitialUnits(queries) {
    try {
      let endpoint = `/v1/admin/users?page=${currentPage}`;

      if (queries) {
        endpoint += queries;
      }

      if (searchKeyword) {
        endpoint += `&q[unit_no_eq]=${searchKeyword}`;
      }

      console.log(response);

      const response = await get(endpoint);
      if (response.ok) {
        setErrors(false);
        setLoading(false);
        setUnits(response.data);
        setPagination(response.pagination);
      } else {
        setErrors(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
      setErrors(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInitialProperties()
  }, [currentPage, searchKeyword])

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1)
  }
  const refresh_data = () => {
    loadInitialProperties()

    setSearchKeyword('')
  function filter_callback(queries) {
    loadInitialUnits(queries);
    setSearchKeyword("");
  }

  return (
    <>
      <div>
        {error && error.Error}
        <section style={{ width: "100%", padding: "0px" }}>
          <CNavbar expand="lg" colorScheme="light" className="bg-light">
            <CContainer fluid>
              <CNavbarBrand href="#">Property</CNavbarBrand>

              <div className="d-flex justify-content-end">
                <CForm onSubmit={(e) => e.preventDefault()} className="input-group  d-flex ">
                  <CFormInput
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    type="search"
                    className="me-0 custom_input"
                    placeholder="Search"
                  />
                  <br></br>
                  <Add />
                </CForm>
              </div>
            </CContainer>
          </CNavbar>
          <div>
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-16">
                    <div className="table-responsive bg-white">
                      <table className="table mb-0">
                        <thead
                          style={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overFlow: "hidden",
                          }}
                        >
                          <tr>
                            <th className="border-0">NAME</th>
                            <th className="border-0">CITY</th>
                            <th className="border-0">USE TYPE</th>
                            <th className="border-0">PAYMENT TERM</th>
                            <th className="border-0">ACTIONS</th>
                            <th className="pt-3 pb-3 border-0  ">
                              Unit Number
                            </th>
                            <th className="pt-3 pb-3 border-0  ">Bed/Bath </th>
                            <th className="pt-3 pb-3 border-0  ">Year Built</th>
                            <th className="pt-3 pb-3 border-0 text-center ">
                              Action{" "}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {properties.map((property) => (
                            <tr key={property.id}>
                              <td style={{ textTransform: 'capitalize' }}>
                                <NavLink to={`/properties/${property.id}/overview`}>
                                  {property.name}
                                </NavLink>
                              </td>
                              <td>{property.city}</td>
                              <td style={{ textTransform: 'uppercase' }}>{property.use_type}</td>
                              <td style={{ textTransform: 'capitalize' }}>
                                {property.payment_term?.replace('_', ' ')}
                              </td>
                              <td>
                                <Dropdown key={property.id}>
                          {units.map((unit) => (
                            <tr key={unit.id}>
                              <td className="pt-3">{unit.unit_no}</td>

                              <td className="pt-3  ">
                                {unit.bedrooms_number +
                                  "  /  " +
                                  unit.bathrooms_number}
                              </td>
                              <td className="pt-3  ">{unit.year_built}</td>
                              <td className="pt-1 ">
                                 <Dropdown
                                  key={unit.id}
                                  className=" text-center"
                                >
                                  <Dropdown.Toggle
                                    as={CustomDivToggle}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <Dropdown.Menu>
                                      <Edit
                                        propertyId={property.id}
                                        after_submit={refresh_data}
                                      />
                                      <Show propertyId={property.id} />
                                    </Dropdown.Menu>
                                    <BsThreeDots />
                                  </Dropdown.Toggle>
                                </Dropdown>
                                  <Dropdown.Menu>
                                    <Edit
                                      unitId={unit.id}
                                      after_submit={refresh_data}
                                    />
                                    <Delete
                                      unitId={unit.id}
                                      after_submit={refresh_data}
                                    />
                                  </Dropdown.Menu>
                                </Dropdown> 
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {loading && <Loading />}
                      
                      {errors && (
                        <p
                          className="d-flex justify-content-cente"
                          style={{
                            color: "red",
                            fontSize: "x-large",
                            marginLeft: "30%",
                          }}
                        >
                          There is a technical issue at Backend
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <CNavbar
            colorScheme="light"
            className="bg-light d-flex justify-content-center"
            placement="fixed-bottom"
          >
            <Row>
              <Col md="12">
                {pagination ? (
                  <Paginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={pagination.per_page}
                    pageCount={pagination.total_pages}
                    forcePage={currentPage - 1}
                  />
                ) : (
                  <br />
                )}
              </Col>
            </Row>
          </CNavbar>
        </section>
      </div>
    </>
  )
}

export default ProfileCard
