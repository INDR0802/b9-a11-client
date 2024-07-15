import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../firebase/AuthProvider";
import Swal from "sweetalert2";

const QueryDetails = () => {
  const id = useParams();
  const [data, setData] = useState([]);
  const [recom, setRecom] = useState([]);
  const { user } = useContext(AuthContext);

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    fetch(`https://b9-a11.vercel.app/query/${id.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id, isLoad]);

  useEffect(() => {
    fetch(`https://b9-a11.vercel.app/recommendedproducts/${id.id}`)
      .then((response) => response.json())
      .then((data) => setRecom(data));
  }, [id.id, isLoad]);

  const { _id, title, name, email, displayName } = data || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const recommendTitle = e.target.recommendationTitle.value;
    const recommendProduct = e.target.recommendedProduct.value;
    const recommendProductImage = e.target.recommendedProductImage.value;
    const recommendReason = e.target.recommendationReason.value;

    const recommendation = {
      recommendationTitle: recommendTitle,
      recommendedProduct: recommendProduct,
      recommendedProductImage: recommendProductImage,
      recommendationReason: recommendReason,
      queryId: _id,
      QueryTitle: title,
      productName: name,
      userEmail: email,
      userName: displayName,
      RecommenderEmail: user?.email,
      RecommenderName: user?.displayName,
      photoURL: user?.photoURL,
      date: new Date().toLocaleDateString(),
    };

    fetch("https://b9-a11.vercel.app/recommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recommendation),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetch(`https://b9-a11.vercel.app/increase/${id.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          });
          Swal.fire({
            title: "Recommended!",
            text: "Your product has been recommended.",
            icon: "success",
          });
          setIsLoad(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row mx-5 lg:mx-auto max-w-[1175px] my-5 gap-5">
        <div className="flex-1">
          <img
            src={data.image}
            alt=""
            className="h-[400px] w-[500px] rounded-xl"
          />
          <div className="bg-green-200 lg:w-[600px] text-wrap mt-4 p-5 border-2 border-green-600 rounded-2xl">
            <h1 className="text-3xl ">{data.title}</h1>
            <h1 className="text-xl font-bold">Name: {data.name}</h1>
            <h1>Company: {data.brand}</h1>
            <h1>Altednation Reason: {data.reason}</h1>
            <h1>Recommendation Count: {data.recommendationCount}</h1>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-center text-2xl font-extrabold mb-5">
            Recommend a alternative product
          </h1>
          <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-[550px] bg-white">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]">
                    Recommendation Title
                  </label>
                  <input
                    type="text"
                    name="recommendationTitle"
                    placeholder="Recommendation Title"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-[#07074D]">
                    Recommended Product
                  </label>
                  <input
                    type="text"
                    name="recommendedProduct"
                    placeholder="Recommended Product"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-base font-medium text-[#07074D]">
                    Recommended Product Image
                  </label>
                  <input
                    type="text"
                    name="recommendedProductImage"
                    id="subject"
                    placeholder="Recommended Product Image"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="message"
                    className="mb-3 block text-base font-medium text-[#07074D]">
                    Recommendation Reason
                  </label>
                  <textarea
                    rows="4"
                    name="recommendationReason"
                    placeholder="Explain your reason"
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"></textarea>
                </div>
                <div>
                  <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                    Add recomendation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        {recom.length != 0 && (
          <div className="text-center mt-10 text-3xl font-bold">
            <h1>All Recommendations</h1>
          </div>
        )}
        {recom?.map((item) => {
          return (
            <div
              key={item._id}
              className="max-w-lg mx-auto border px-6 py-4 rounded-lg my-10">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <img
                      src={item.photoURL}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="text-lg font-medium text-gray-800">
                        {item.RecommenderName}
                      </div>
                      <div className="text-gray-500">{item.date}</div>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed mb-6">
                    Recommended Product: {item.recommendedProduct}
                  </p>
                </div>
                <img
                  src={item.recommendedProductImage}
                  alt=""
                  className="size-20"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700 mr-4">
                    <i className="far fa-thumbs-up"></i> Like
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <i className="far fa-comment-alt"></i> Reply
                  </a>
                </div>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700 mr-4">
                    <i className="far fa-flag"></i> Report
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <i className="far fa-share-square"></i> Share
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QueryDetails;
