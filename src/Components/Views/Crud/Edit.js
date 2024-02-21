import React, { useState, useEffect } from 'react'
import useFetch from 'use-http'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import PropTypes from 'prop-types'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CContainer,
} from '@coreui/react'
import { Button, Form, Row, Col } from 'react-bootstrap'

export default function EditProperty({ propertyId }) {
  const { get, put, response } = useFetch()

  const [visible, setVisible] = useState(false)
  const { register, handleSubmit, setValue, control } = useForm()

  const [propertyData, setPropertyData] = useState({})
  const [loading, setLoading] = useState(true)

  async function fetchPropertyData() {
    try {
      const api = await get(`/v1/admin/premises/properties/${propertyId}`)
      if (response.ok) {
        setPropertyData(api.data)
        setLoading(false)
      } else {
        toast.error(response.data?.message || 'Failed to fetch property data')
      }
    } catch (error) {
      console.error('Error fetching property data:', error)
    }
  }

  useEffect(() => {
    fetchPropertyData()
  }, [])

  async function onSubmit(data) {
    try {
      const result = await put(`/v1/admin/premises/properties/${propertyId}`, { property: data })
      console.log('API response:', result)

      if (result.ok) {
        toast.success('Property Data Edited Successfully')
        setVisible(!visible)
        setPropertyData(data) // Update the property data
      } else {
        toast.error(result.data?.message || 'Failed to edit property data')
        console.error('Error editing property data:', result)
      }
    } catch (error) {
      toast.error('An unexpected error occurred while editing property data')
      console.error('Unexpected error editing property data:', error)
    }
  }

  return (
    <>
      <div>
        <button
          style={{
            backgroundColor: 'white',
            marginLeft: '4px',
            width: '90%',
            border: 'none',
            color: '#00bfcc',
          }}
          type="button"
          className="btn btn-tertiary "
          data-mdb-ripple-init
          onClick={() => setVisible(!visible)}
        >
          Edit
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
            <CModalTitle id="StaticBackdropExampleLabel">Edit Property</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CContainer>
              <Row>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col className="pr-1 mt-3" md="6">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Property Name"
                          type="text"
                          defaultValue={propertyData.name}
                          {...register('name')}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pr-1 mt-3" md="6">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          placeholder="City"
                          type="text"
                          defaultValue={propertyData.city}
                          {...register('city')}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1 mt-3" md="6">
                      <Form.Group>
                        <label>Use Type</label>
                        <Form.Control
                          placeholder="Use Type"
                          type="text"
                          defaultValue={propertyData.use_type}
                          {...register('use_type')}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1 mt-3" md="12">
                      <Form.Group>
                        <label>Payment Term</label>
                        <Form.Control
                          placeholder="Payment Term"
                          type="text"
                          defaultValue={propertyData.payment_term}
                          {...register('payment_term')}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <CModalFooter>
                      <Button
                        data-mdb-ripple-init
                        type="submit"
                        className="btn btn-primary btn-block custom_theme_button"
                      >
                        Submit
                      </Button>
                      <CButton
                        className="custom_grey_button"
                        style={{ color: 'white', backgroundColor: 'gray', border: 'none' }}
                        onClick={() => setVisible(false)}
                      >
                        Close
                      </CButton>
                    </CModalFooter>
                  </div>
                  <div className="clearfix"></div>
                </Form>
              </Row>
            </CContainer>
          </CModalBody>
        </CModal>
      </div>
    </>
  )
}

EditProperty.propTypes = {
  propertyId: PropTypes.number.isRequired,
}
