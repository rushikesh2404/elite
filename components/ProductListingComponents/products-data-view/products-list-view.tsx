import { ProductsProps } from "../../../interfaces/products-view-interface";
import ProductListViewCard from "../../../cards/product-list-view-card";
import ListViewLoadingLayout from "./ListViewLoadingLayout";
import { Norecord } from "../../NoRecord";

const ProductsListView = (props: ProductsProps) => {
  // console.log("product card", props.product_data);

  const {
    productListTotalCount,
    loading,
    product_data,
    filtersData,
    handleRenderingOfImages,
    wishlistData,
    handleLoadMore,
    currency_state_from_redux,
  } = props;
  return (
    <div
      className={`${
        filtersData && filtersData?.length > 0 ? "col-lg-9" : "col-lg-12"
      }`}
    >
      {loading ? (
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-lg-12 mx-3">
                <ListViewLoadingLayout />
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="row ">
          {product_data && product_data.length > 0 ? (
            product_data.map((product: any, index: number) => {
              return (
                <div key={index} className="p-0 my-1 ">
                  <ProductListViewCard
                    currency_state_from_redux={currency_state_from_redux}
                    product_data={product}
                    key={index}
                    wishlistData={wishlistData}
                    handleRenderingOfImages={handleRenderingOfImages}
                  />
                </div>
              );
            })
          ) : (
            <Norecord
              heading=""
              content="Looking for something specific but couldn't find it? Let us know we will get it for you"
            />
          )}
        </div>
      )}

      {productListTotalCount > product_data?.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-primary button_color my-5"
            onClick={handleLoadMore}
          >
            load more
          </button>
        </div>
      )}
    </div>
  );
};
export default ProductsListView;
