import React, { useState, useEffect } from "react";
import Link from "next/link";
import useProfilePage from "../../hooks/GeneralHooks/ProfileHooks/ProfileHooks";
import { useRouter } from "next/router";
import { GetEnquiryHistoryPdf } from "../../services/api/general_apis/ProfilePageApi/enquiry-history-pdf-api";
import EditAddressForm from "../CheckoutPageComponent/AddressForms/EditAddressForm";
import {
  FetchCitiesForAddressForm,
  FetchStateForAddressForm,
} from "../../services/api/general_apis/customer-form-data-api";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { useSelector } from "react-redux";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const ProfileMaster = () => {
  const { profileList, ageingReport, enquiryHistoryPro }: any =
    useProfilePage();
  const router = useRouter();
  // console.log("tsx profile", profileList);
  // console.log("###quot in api tsx file", enquiryHistoryPro);
  const [showEditModal, setshowEditModal] = useState<boolean>(false);
  const TokenFromStore: any = useSelector(get_access_token);

  const [showShipEditModal, setshowShipEditModal] = useState<boolean>(false);
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  const [detailData, setdetailData] = useState();
  const [shippingDetailData, setShippingDetailData] = useState();
  const [addType, setAddType] = useState("");
  let [selectedCity, setSelectedCity] = useState("");
  let [state, setState] = useState([]);
  let [city, setCity] = useState<any>([]);
  const [err, setErr] = useState(false);
  let [selectedStates, setSelectedStates] = useState("");

  useEffect(() => {
    const getStateData = async () => {
      const stateData = await FetchStateForAddressForm(TokenFromStore?.token);
      if (stateData?.length > 0) {
        let stateValues = stateData
          .map((item: any) => item?.name)
          .filter((item: any) => item !== null);
        setState(stateValues);
      } else {
        setErr(!err);
      }
    };
    getStateData();
  }, []);
  const handleSelectedState = async (stateValue: string) => {
    setSelectedCity("");
    setCity([]);
    const getCitiesFromState: any = await FetchCitiesForAddressForm(
      stateValue,
      TokenFromStore?.token
    );
    // console.log("cities values", getCitiesFromState);
    if (getCitiesFromState?.length > 0) {
      let citiesValues = getCitiesFromState
        .map((item: any) => item.name)
        .filter((item: any) => item !== null);

      // console.log("cities values new", citiesValues);
      setCity(citiesValues);
    }
  };

  const documentQueued = router.query.data
    ? JSON.parse(router.query.data as string)
    : "";
  // console.log("paytab", documentQueued.setTrue);
  const handleEditModal = (billingData: any, add_type: any) => {
    // console.log("profile billing edit data", billingData);
    setshowEditModal(!showEditModal);
    // setdetailData(profileBillingData);
    // console.log("billing detail",profileList.billing_address)
    setdetailData(profileList?.billing_address);
    setAddType(add_type);
  };

  const handleShippingEditModal = (shippingData: any, add_type: any) => {
    // console.log("shipping data", shippingData);
    setshowShipEditModal(!showShipEditModal);
    setAddType(add_type);
    setShippingDetailData(profileList?.shipping_address);
  };

  // console.log("address_type pr", addType);

  const personalDetails = () => {
    return (
      <div className="ms-2 products-name">
        <div className="mob-userdetail-containers">
          <div className="col-lg-4 col-md-5 bold fs-3 products-name" >
            {selectedMultiLangData?.user_name}:
          </div>
          <div className="col-lg-8  col-md-7 fs-3 persons-data-mob products-name" >
            {profileList && profileList?.profile_details?.customer_name}
          </div>
        </div>

        <div className="mob-userdetail-containers">
          <div className="col-lg-4 bold fs-3 products-name">
            {selectedMultiLangData?.company_name} :
          </div>
          <div className="col-lg-8 fs-3 persons-data-mob products-name">
            {profileList && profileList?.profile_details?.company_name}
          </div>
        </div>


        <div className="mob-userdetail-containers products-name">
          <div className="col-lg-4 bold fs-3">
            {selectedMultiLangData?.mobile_number} :
          </div>
          <div className="col-lg-8 fs-3 persons-data-mob products-name">
            {profileList && profileList?.profile_details?.contact_no}
          </div>
        </div>

        <div className="mob-userdetail-containers products-name">
          <div className="col-lg-4 bold fs-3">
            {selectedMultiLangData?.email} :
          </div>
          <div className="col-lg-8 fs-3 persons-data-mob products-name">
            {profileList && profileList?.profile_details?.email}
          </div>
        </div>
      </div>
    );
  };

  const availableCoupons = () => {
    return (
      <>
        <div className="mb-2 row products-name">
          <div className="col-lg-2 fs-3 bold">
            {selectedMultiLangData?.coupons} :
          </div>
          <div className="col-lg-9">
            <div className="row">
              {profileList && profileList?.allowed_coupons?.length > 0 ? (
                <>
                  {profileList &&
                    profileList?.allowed_coupons?.map(
                      (coupons: any, index: any) => (
                        <>
                          <div className="col-lg-4 fs-4" key={index}>
                            {index + 1}. {coupons}
                          </div>
                        </>
                      )
                    )}
                </>
              ) : (
                <>{selectedMultiLangData?.no_coupons_available}</>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleAgeingReportDisplay = () => {
    if (ageingReport.length > 0) {
      return (
        <>
          <div className="row mt-5 products-name">
            <div className="col-lg-12">
              <div className="">
                <div className="profile">
                  <h4 className="text-start fw-bolder text-uppercase">
                    {selectedMultiLangData?.ageing_report}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-sm card table-responsive ageing_report">
            {/* <div className="card-body"></div> */}
            <table className="w-100 ageingreport-table">
              <tr>
                <th>{selectedMultiLangData?.customer_code}</th>
                <th>{selectedMultiLangData?.customer_name}</th>
                <th>0-30</th>
                <th>31-60</th>
                <th>61-90</th>
                <th>91-120</th>
                <th>121+</th>
              </tr>

              {ageingReport?.length > 0 &&
                ageingReport.map((stockData: any, index: number) => {
                  return (
                    <>
                      <tr>
                        <td>{stockData?.customer_code}</td>
                        <td>{stockData?.customer_name}</td>
                        <td>{stockData?.d_0_30}</td>
                        <td>{stockData?.d_31_60}</td>
                        <td>{stockData?.d_61_90}</td>
                        <td>{stockData?.d_90_120}</td>
                        <td>{stockData?.d_120_to_above}</td>
                      </tr>
                    </>
                  );
                })}
            </table>
          </div>
        </>
      );
    }
  };

  const showBillingAddresses = () => {
    return (
      <> 
        <div className="shadow-sm card px-2 products-name" >
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h5 className="fw-bolder pt-1 products-name">
                  {selectedMultiLangData?.billing_addresses}
                </h5>
              </div>
              <div className="col-lg-4 text-end">
                <button
                  type="button"
                  onClick={() => {
                    console.log("clicked");
                    handleEditModal(profileList, "Billing");
                  }}
                  className="showmodal_button"
                >
                  <i className="fa fa-edit text-primary fs-2 my-0"></i>
                </button>
              </div>
            </div>
            {/* <hr /> */}

            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.name} :</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.billing_address?.name}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2" >
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.email}:</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.billing_address?.email}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.mobile_number}:</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.billing_address?.contact}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.address} :</p>
              </div>
              <div className="col-sm-7 w-lg-25 w-sm-75 ps-3 mt-2">
                <div className="fw-bolder">
                  {profileList && profileList?.billing_address?.address_1}
                </div>
                <div className="fw-bolder">
                  {profileList && profileList?.billing_address?.address_2}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.postal_code}:</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.billing_address?.postal_code}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.state} :</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.billing_address?.state}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.city} :</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.billing_address?.city}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.country}:</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.billing_address?.country}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const showShippigAddresses = () => {
    return (
      <>
        <div className="shadow-sm card px-2 products-name">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h5 className="fw-bolder pt-1 products-name">
                  {selectedMultiLangData?.shipping_addresses}
                </h5>
              </div>
              <div className="col-lg-4 text-end">
                <button
                  type="button"
                  onClick={() => {
                    handleShippingEditModal(profileList, "Shipping");
                  }}
                  className="showmodal_button"
                >
                  <i className="fa fa-edit text-primary fs-2 my-0"></i>
                </button>
              </div>
            </div>
            {/* <hr /> */}

            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.name} :</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.shipping_address?.name}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.email} :</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.shipping_address?.email}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.mobile_number}:</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.shipping_address?.contact}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.address}:</p>
              </div>
              <div className="col-sm-7 w-lg-25 w-sm-75 ps-3 mt-2">
                <div className="fw-bolder">
                  {profileList && profileList?.shipping_address?.address_1}
                </div>
                <div className="fw-bolder">
                  {profileList && profileList?.shipping_address?.address_2}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.postal_code}:</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.shipping_address?.postal_code}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.state} :</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.shipping_address?.state}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.city} :</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.shipping_address?.city}
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="col-sm-5">
                <p className="">{selectedMultiLangData?.country}:</p>
              </div>
              <div className="col-sm-7 fw-bolder ps-3">
                {profileList && profileList?.shipping_address?.country}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const paymentTerms = () => {
    return (
      <div className="row m-0 products-name">
        <div className="shadow-sm card mt-0 ">
          <div className="card-body">
            <div className="mb-2 row">
              <div className="col-lg-3 fs-3 bold">
                {selectedMultiLangData?.payment_terms} :{" "}
              </div>
              <div className="col-lg-9">
                <div className="row">
                  {" "}
                  {profileList && profileList?.profile_details?.payment_terms}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const creditLimit = () => {
    return (
      <>
        <div className="row m-0">
          <div className="shadow-sm card mt-4 ">
            <div className="card-body">
              <div className="mb-2 row">
                <div className="col-lg-3 fs-3 bold">
                  {selectedMultiLangData?.credit_limit} :{" "}
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    {" "}
                    {profileList && profileList?.profile_details?.credit_limit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const handlePdf = async (pdf_link: any) => {
    const pdfRes = await GetEnquiryHistoryPdf(pdf_link);
    console.log("pdf res in jsx", pdfRes);
    // window.open (`${pdfRes}` , '_blank')
  };

  let dateObj: any;
  let formattedDate: any;
  const enquiryHistory = () => {
    return (
      <>
        <div className="row mt-0 products-name">
          <div className="col-lg-12 products-name">
            <div className="">
              <div className="profile products-name">
                <h4 className="text-start fw-bolder text-uppercase products-name mb-2">
                  {selectedMultiLangData?.enquiry_history}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-sm card table-responsive ageing_report">
          {/* <div className="card-body"></div> */}
          <table className="w-100 table table-striped ageingreport-table ">
            <thead>
              <tr>
                <th>{selectedMultiLangData?.quotation_id}</th>
                <th>{selectedMultiLangData?.enquiry_date}</th>
                <th>{selectedMultiLangData?.total_qty}</th>
                <th>{selectedMultiLangData?.total_amount}</th>
                <th>{selectedMultiLangData?.download}</th>
              </tr>
            </thead>
            <tbody>
              {enquiryHistoryPro?.length > 0 &&
                enquiryHistoryPro.map((enq: any, index: number) => {
                  console.log("quot in api enq", enq);
                  return (
                    <>
                      <tr>
                        <td>{enq.name}</td>
                        <td>
                          {/* {enq.enquiry_date} */}

                          <span>
                            {(new Date(
                              enq.enquiry_date.toLocaleString()
                            ).getDate() < 10
                              ? "0"
                              : "") +
                              new Date(
                                enq.enquiry_date.toLocaleString()
                              ).getDate()}
                            -
                            {new Date(
                              enq.enquiry_date.toLocaleString()
                            ).getMonth() + 1}
                            -
                            {new Date(
                              enq.enquiry_date.toLocaleString()
                            ).getFullYear()}
                          </span>
                        </td>
                        <td>{enq?.total_qty}</td>
                        <td>{enq?.grand_total?.toLocaleString("en-IN")}</td>
                        <td>
                          <Link href="" legacyBehavior>
                            <a
                              className="text-dark download-link"
                              onClick={() => {
                                handlePdf(enq?.print_url);
                              }}
                            >
                              {selectedMultiLangData?.download}
                            </a>
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container">
        <section className="profile_section ">
          <div className="container">
            <h1 className="bold text-uppercase mb-3 profile_heading products-name profile_heading_mob ms-1">
              {selectedMultiLangData?.my_account}
            </h1>
            <div className="row">
              <div className="col-sm-1 col-lg-3 mt-2">
                <div className="contactus_tab ">
                  <ul
                    id="faq-tab"
                    className="nav nav-tabs d-flex flex-column contact_tabs text-center"
                    role="tablist"
                  >
                    <li className="nav-item account_tab_mob products-name">
                      <Link href="#contact_faq" legacyBehavior>
                        <a
                          className={`nav-link profile_nav border tab_width ${!documentQueued?.setTrue ? "active" : ""
                            }  nav_tabs_list `}
                          id="personal_details_faq_tab"
                          data-bs-toggle="pill"
                          href="#personal_details_faq"
                          role="tab"
                          aria-controls="personal_details_faq"
                          aria-selected="true"
                        >
                          <h6 className="link-tabs my-3 products-name">
                            <i
                              className="fa fa-user-circle fs-1"
                              aria-hidden="true"
                            ></i>
                            <p className="mb-0 sidebar_texsize" >
                              {selectedMultiLangData?.personal_details}
                            </p>
                          </h6>
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item account_tab_mob">
                      <Link href="#contact_faq" legacyBehavior>
                        <a
                          className="nav-link profile_nav border nav_tabs_list tab_width"
                          id="address_faq_tab"
                          data-bs-toggle="pill"
                          href="#address_faq"
                          role="tab"
                          aria-controls="address_faq"
                          aria-selected="true"
                        >
                          <h6 className="link-tabs my-3 products-name">
                            <i
                              className="fa fa-map-marker fs-1"
                              aria-hidden="true"
                            ></i>
                            <p className="mb-0 sidebar_texsize">
                              {" "}
                              {selectedMultiLangData?.address}
                            </p>
                          </h6>
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item account_tab_mob">
                      <Link href="#offers_faq" legacyBehavior>
                        <a
                          className="nav-link profile_nav border nav_tabs_list tab_width"
                          id="offers_faq_tab"
                          data-bs-toggle="pill"
                          href="#offers_faq"
                          role="tab"
                          aria-controls="offers_faq"
                          aria-selected="true"
                        >
                          <h6 className="link-tabs my-3 products-name">
                            <i
                              className="fa fa-tags fs-1"
                              aria-hidden="true"
                            ></i>
                            <p className="mb-0 sidebar_texsize">
                              {" "}
                              {selectedMultiLangData?.offers}
                            </p>
                          </h6>
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item  account_tab_mob">
                      <Link href="#pay_faq" legacyBehavior>
                        <a
                          className={`nav-link profile_nav border tab_width ${documentQueued?.setTrue ? "active" : ""
                            }  nav_tabs_list `}
                          id="pay_faq_tab"
                          data-bs-toggle="pill"
                          href="#pay_faq"
                          role="tab"
                          aria-controls="pay_faq"
                          aria-selected="false"
                        >
                          <h6 className="link-tabs my-3 products-name">
                            <i
                              className="fa fa-credit-card fs-1"
                              aria-hidden="true"
                            ></i>
                            <p className="mb-0 sidebar_texsize">
                              {selectedMultiLangData?.payment}
                            </p>
                          </h6>
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item account_tab_mob">
                      <Link href="#enqHist_faq" legacyBehavior>
                        <a
                          className="nav-link profile_nav border nav_tabs_list tab_width"
                          id="enqHist_faq_tab"
                          data-bs-toggle="pill"
                          href="#enqHist_faq"
                          role="tab"
                          aria-controls="enqHist_faq_tab"
                          aria-selected="false"
                        >
                          <h6 className="link-tabs my-3 products-name">
                            <i
                              className="fa fa-calendar-check-o fs-1"
                              aria-hidden="true"
                            ></i>
                            <p className="mb-0 sidebar_texsize">
                              {selectedMultiLangData?.enquiry_history}
                            </p>
                          </h6>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="tab-content" id="contact-tabContent">
                  <div
                    className={`tab-pane fade show  ${!documentQueued.setTrue ? "active" : ""
                      }  `}
                    id="personal_details_faq"
                    role="tabpanel"
                    aria-labelledby="personal_details_faq_tab"
                  >
                    <div className="card">
                      <div className="card-body row gy-3">
                        {personalDetails()}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="address_faq"
                    role="tabpanel"
                    aria-labelledby="address_faq_tab"
                  >
                    <div className="card">
                      <div className="row card-body gy-5">
                        <div className="col-lg-6">{showShippigAddresses()}</div>
                        <div className="col-lg-6">{showBillingAddresses()}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="offers_faq"
                    role="tabpanel"
                    aria-labelledby="offers_faq_tab"
                  >
                    <div className="card">
                      <div className="card-body">
                        {/* Coupon code */}
                        <div className="row m-0">
                          <div className="shadow-sm card mt-0 ">
                            <div className="card-body">
                              {availableCoupons()}
                            </div>
                          </div>
                        </div>
                        {/* Discount section */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="password_faq"
                    role="tabpanel"
                    aria-labelledby="password_faq_tab"
                  >
                    <div className="card">
                      <div className="card-body"></div>
                    </div>
                  </div>

                  <div
                    className={`tab-pane fade show  ${documentQueued.setTrue ? "active" : ""
                      }  `}
                    id="pay_faq"
                    role="tabpanel"
                    aria-labelledby="pay_faq_tab"
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="text-center pt-0">
                          {paymentTerms()}

                          {handleAgeingReportDisplay()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="enquiries_faq"
                    role="tabpanel"
                    aria-labelledby="enquiries_faq_tab"
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="text-center pt-5">
                          <div className="row m-0">
                            <div className="shadow-sm card mt-4 ">
                              <div className="card-body">
                                <div className="mb-2 row">
                                  <div className="col-lg-3 fs-3 bold">
                                    {selectedMultiLangData?.past_enquiries} :
                                  </div>
                                  <div className="col-lg-9">
                                    <div className="row"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="orders_faq"
                    role="tabpanel"
                    aria-labelledby="orders_faq_tab"
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="row m-0">
                          <div className="shadow-sm card mt-4 ">
                            <div className="card-body">
                              <div className="mb-2 row">
                                <div className="col-lg-3 fs-3 bold">
                                  {selectedMultiLangData?.replenishment_orders}{" "}
                                  :
                                </div>
                                <div className="col-lg-9">
                                  <div className="row"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="enqHist_faq"
                    role="tabpanel"
                    aria-labelledby="enqHist_faq_tab"
                  >
                    <div className="card">
                      <div className="card-body">{enquiryHistory()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showShipEditModal ? (
        <EditAddressForm
          show={showShipEditModal}
          toHide={handleShippingEditModal}
          detailData={shippingDetailData}
          handleSelectedState={handleSelectedState}
          selectedStates={selectedStates}
          state={state}
          setSelectedStates={setSelectedStates}
          setSelectedCity={setSelectedCity}
          city={city}
          selectedCity={selectedCity}
          address_type={addType}
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}

      {showEditModal ? (
        <EditAddressForm
          show={showEditModal}
          toHide={handleEditModal}
          detailData={detailData}
          handleSelectedState={handleSelectedState}
          selectedStates={selectedStates}
          state={state}
          setSelectedStates={setSelectedStates}
          setSelectedCity={setSelectedCity}
          city={city}
          selectedCity={selectedCity}
          address_type={addType}
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}
    </>
  );
};

export default ProfileMaster;
