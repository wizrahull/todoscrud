// ProfileCard.js

import React, { useState, useEffect } from 'react';
import useFetch from 'use-http';
import '../scss/_custom.scss';
import '../scss/style.scss';
import '../scss/_variables.scss';
// import './scss/_layout.scss';
import '../scss/_add.scss';
import '../scss/_roles.scss';
import { BsThreeDots } from 'react-icons/bs';
import Loading from '../components/loading/loading';
import { Row, Col, Dropdown } from 'react-bootstrap';
import Paginate from '../components/Pagination';
import { useParams } from 'react-router-dom';

import { CNavbar, CContainer, CNavbarBrand } from '@coreui/react';
import CustomDivToggle from '../components/CustomDivToggle';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';

function ProfileCard() {
  const { propertyId } = useParams();
  const { get, response, error } = useFetch();

  const [units, setUnits] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialUnits();
  }, [currentPage, propertyId]);

  async function loadInitialUnits(queries) {
    try {
      let endpoint = `/v1/admin/premises/properties/${propertyId}/units?page=${currentPage}`;

      if (queries) {
        endpoint += queries;
      }

      if (searchKeyword) {
        endpoint += `&q[unit_no_eq]=${searchKeyword}`;
      }

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
      console.error('Error fetching units:', error);
      setErrors(true);
      setLoading(false);
    }
  }

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const refresh_data = () => {
    loadInitialUnits();
  };

  function filter_callback(queries) {
    loadInitialUnits(queries);
    setSearchKeyword('');
  }

  return (
    <>
      <div>
        {error && error.Error}
        <section style={{ width: '100%', padding: '0px' }}>
          <CNavbar expand="lg" colorScheme="light" className="bg-light">
            <CContainer fluid>
              <CNavbarBrand href="#">Unit</CNavbarBrand>
              <div className="d-flex justify-content-end bg-light">
                <div className="d-flex  " role="search">
                  <input
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="form-control me-0 custom_input  "
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    onClick={loadInitialUnits}
                    className="btn btn-outline-success custom_search_button "
                    type="submit"
                  >
                    Search
                  </button>
                </div>
                <Add after_submit={refresh_data} />
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
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overFlow: 'hidden',
                          }}
                        >
                          <tr>
                            <th className="pt-3 pb-3 border-0  ">Unit Number</th>
                            <th className="pt-3 pb-3 border-0  ">Bed/Bath </th>
                            <th className="pt-3 pb-3 border-0  ">Year Built</th>
                            <th className="pt-3 pb-3 border-0 text-center ">Action </th>
                          </tr>
                        </thead>

                        <tbody>
                          {units.map((unit) => (
                            <tr key={unit.id}>
                              <td className="pt-3">{unit.unit_no}</td>

                              <td className="pt-3  ">
                                {unit.bedrooms_number + '  /  ' + unit.bathrooms_number}
                              </td>
                              <td className="pt-3  ">{unit.year_built}</td>
                              <td className="pt-1 ">
                                <Dropdown key={unit.id} className=" text-center">
                                  <Dropdown.Toggle
                                    as={CustomDivToggle}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <BsThreeDots />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Edit unitId={unit.id} after_submit={refresh_data} />
                                    <Delete unitId={unit.id} after_submit={refresh_data} />
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
                          style={{ color: 'red', fontSize: 'x-large', marginLeft: '30%' }}
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
  );
}

export default ProfileCard;
