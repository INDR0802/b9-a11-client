import { useContext } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import Swal from "sweetalert2";

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  const { displayName, email, photoURL } = user || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.ProductName.value;
    const brand = e.target.ProductBrand.value;
    const image = e.target.ProductImage.value;
    const title = e.target.QueryTitle.value;
    const reason = e.target.BoycotingReason.value;
    const date = new Date().toLocaleDateString();

    const query = {
      name,
      brand,
      image,
      title,
      reason,
      displayName,
      email,
      photoURL,
      date,
      recommendationCount: 0,
    };

    fetch("https://b9-a11.vercel.app/queries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "All Set!",
            text: "Data added successfuly",
            icon: "success",
          });
          e.target.ProductName.value = "";
          e.target.ProductBrand.value = "";
          e.target.ProductImage.value = "";
          e.target.QueryTitle.value = "";
          e.target.BoycotingReason.value = "";
        }
      });
  };
  return (
    <div className=" mb-10 pb-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="text-white relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-center pb-6">
            <h1 className="text-3xl">Add your queries</h1>

            <p className="text-gray-300">
              Fill up the form below to send us a query.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Product Name"
              name="ProductName"
            />

            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Product Brand"
              name="ProductBrand"
            />

            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Product Image"
              name="ProductImage"
            />
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Query Title"
              name="QueryTitle"
            />

            <textarea
              className="shadow mb-4 min-h-0 appearance-none border rounded h-[100px] resize-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Boycoting Reason...."
              name="BoycotingReason"></textarea>

            <div className="flex justify-between">
              <input
                className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="Add Query ➤"
              />
              <input
                className="shadow bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="reset"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuery;
