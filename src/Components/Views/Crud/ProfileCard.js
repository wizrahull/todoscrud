import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Add from "./Add";
import { useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Loading from "../components/loading/loading";
import CustomDivToggle from "../components/CustomDivToggle";
import { CNavbar, CContainer, CNavbarBrand } from "@coreui/react";
import Show from "./Show";
import Edit from "./Edit";
import { toast } from "react-toastify";

function ProfileCard() {
  const { get, response, error } = useFetch();

  const location = useLocation();

  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadInitialProperties = async () => {
    let endpoint = `/v1/admin/premises/properties?page=${currentPage}&search=${searchKeyword}`;
    const initialProperties = await get(endpoint);

    if (initialProperties?.data) {
      setLoading(false);
      setProperties(initialProperties.data);
    } else {
      setErrors(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialProperties();
  }, [currentPage, searchKeyword]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const refresh_data = () => {
    loadInitialProperties();
    setSearchKeyword("");
  };

  return (
    <>
      <div className="shadow-5 mt-3">
        {error && error.Error}
        <section className="w-100">
          <CNavbar expand="lg" colorScheme="light" className="bg-light">
            <CContainer fluid>
              <CNavbarBrand href="#">Property</CNavbarBrand>

              <div className="d-flex justify-content-end">
                <br></br>
                <Add after_submit={refresh_data} />
              </div>
            </CContainer>
          </CNavbar>
          <div>
            <div className="mask d-flex align-items-center h-100">
              <div className="w-100">
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
                          </tr>
                        </thead>

                        <tbody>
                          {properties.map((property) => (
                            <tr key={property.id}>
                              <td style={{ textTransform: "capitalize" }}>
                                {property.name}
                              </td>
                              <td>{property.city}</td>
                              <td style={{ textTransform: "uppercase" }}>
                                {property.use_type}
                              </td>
                              <td style={{ textTransform: "capitalize" }}>
                                {property.payment_term?.replace("_", " ")}
                              </td>
                              <td>
                                <Dropdown key={property.id}>
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
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {loading && <Loading />}
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
          ></CNavbar>
        </section>
      </div>
    </>
  );
}

export default ProfileCard;
