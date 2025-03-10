import React from "react";
import OrderSummary from "../OrderSummary/OrderSummary";
import { CONSTANTS } from "../../services/config/app-config";

const HandleOrderSection = (props: any) => {
  const {
    orderSummary,
    handleDeleteCouponCode,
    handleApplyCouponCode,
    couponCode,
    setCouponCode,
    handleStoreCredit,
    deleteCoupon,
    storeCredit,
    setStoreCredit,
    couponCodeApiRes,
    couponError,
    handlePlaceOrder,
  } = props;

  let isDealer = JSON.parse(localStorage.getItem("isDealer") as any);

  return (
    <div>
      {(!isDealer || isDealer === true && !CONSTANTS.SHOW_TRANSPORTERS_LIST_TO_DEALER )&& (
        <div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            // disabled={!acceptedTerms}
            className="d-grid gap-2 col-lg-12 col-12  btn btn-md bold text-white border-0 button_color mt-2"
          >
            {deleteCoupon}
            Place Order
          </button>
        </div>
      )}

      <div className="shadow-sm card">
        <div className="card-body py-0 px-1">
          {isDealer ? null : (
            <div className="accordion" id="accordionExample">
              {CONSTANTS.ENABLE_APPLY_COUPON_CODE ? (
                <>
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed pt-3 pb-1 fs-4"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        Apply Coupon Code
                      </button>
                    </h2>

                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse "
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body py-0 pt-2">
                        <form className=" fields-group-md">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="couponCode"
                              name="couponCode"
                              value={couponCode}
                              onChange={(e: any) =>
                                setCouponCode(e?.target?.value)
                              }
                            />
                            <span className="red">
                              {couponCodeApiRes
                                .replace("LinkValidationError('", "")
                                .replace("')", "")}
                            </span>

                            <div></div>
                          </div>

                          {deleteCoupon ? (
                            <div>
                              <button
                                type="button"
                                className="btn btn-sm custom-btn transparent d-block w-100 btn btn-danger mt-2"
                                onClick={() => handleDeleteCouponCode()}
                              >
                                Delete Coupon
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button
                                type="button"
                                className="btn btn-sm custom-btn transparent d-block w-100 btn button_color mt-2"
                                onClick={(e: any) => handleApplyCouponCode(e)}
                              >
                                Apply Coupon
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {CONSTANTS.ENABLE_APPLY_COUPON_CODE ? (
                <>
                  {" "}
                  <div className="border-bottom py-2"></div>
                </>
              ) : null}

              {CONSTANTS.ENABLE_STORE_CREDIT ? (
                <>
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed pt-2 fs-4"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Use store credit
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body pt-1 pb-0">
                        <form className=" fields-group-md">
                          <div className="form-group">
                            <input
                              placeholder="Enter credit amount"
                              type="text"
                              className="form-control"
                              value={storeCredit}
                              onChange={(e: any) =>
                                setStoreCredit(e?.target?.value)
                              }
                            />
                            <span className="red"></span>
                          </div>
                        </form>
                        <button
                          type="button"
                          className="btn btn-sm transparent custom-btn d-block w-100 button_color mt-2"
                          onClick={(e: any) => handleStoreCredit(e)}
                        >
                          Use store credit
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <div className="border-bottom py-2"></div>
            </div>
          )}

          <h5 className="px-2 pt-2 text-uppercase">Order Summary</h5>

          <OrderSummary orderSummary={orderSummary} couponError={couponError} />
        </div>
      </div>
    </div>
  );
};

export default HandleOrderSection;
