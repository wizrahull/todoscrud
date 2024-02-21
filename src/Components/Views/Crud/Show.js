import React, { useState, useEffect } from 'react'
import useFetch from 'use-http'
import PropTypes from 'prop-types'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'

export default function Show({ propertyId }) {
  const [visible, setVisible] = useState(false)
  const [property, setProperty] = useState({})
  const { get, response } = useFetch()

  useEffect(() => {
    getPropertyData()
  }, [])

  async function getPropertyData() {
    try {
      const api = await get(`/v1/admin/premises/properties/${propertyId}`)
      if (response.ok) {
        setProperty(api.data)
      } else {
        // Handle error if needed
        console.error('Error fetching property data:', response)
      }
    } catch (error) {
      // Handle unexpected error if needed
      console.error('Unexpected error fetching property data:', error)
    }
  }

  return (
    <div>
      <button
        style={{
          color: '#00bfcc',
          backgroundColor: 'white',
          marginLeft: '4px',
          width: '90%',
          border: 'none',
        }}
        type="button"
        className="btn btn-tertiary "
        data-mdb-ripple-init
        onClick={() => setVisible(!visible)}
      >
        Show
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
          <CModalTitle id="StaticBackdropExampleLabel">Property Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="container bootstrap snippets bootdey ">
            <div className="panel-body inf-content">
              <div className="row">
                <div className="col-md-7">
                  <br />
                  <div className="table-responsive">
                    <table className="table table-user-information">
                      <tbody>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-asterisk text-primary"></span>
                              Name
                            </strong>
                          </td>
                          <td className="text-primary text-black-50">{property?.name}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-map-marker text-primary"></span>
                              City
                            </strong>
                          </td>
                          <td className="text-primary text-black-50">{property?.city}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-home text-primary"></span>
                              Use Type
                            </strong>
                          </td>
                          <td className="text-primary text-black-50">{property?.use_type}</td>
                        </tr>
                        <tr>
                          <td>
                          </td>
                          <td className="text-primary text-black-50">{property?.unit_counts}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-credit-card text-primary"></span>
                              Payment Term
                            </strong>
                          </td>
                          <td className="text-primary text-black-50">{property?.payment_term}</td>
                        </tr>
                        {/* Add more details as needed */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <CModalFooter>
                  <CButton className="custom_grey_button" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                </CModalFooter>
              </div>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </div>
  )
}

Show.propTypes = {
  propertyId: PropTypes.number.isRequired,
}
