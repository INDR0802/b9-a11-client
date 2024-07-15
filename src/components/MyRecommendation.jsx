import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import Swal from "sweetalert2";

const MyRecommendation = () => {
  const { user } = useContext(AuthContext);
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://b9-a11.vercel.app/myrecommendations/${user?.email}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [user?.email]);

  const handleDelete = (id, queryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://b9-a11.vercel.app/deleterecommendation/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((del) => {
            if (del.deletedCount > 0) {
              const remainingQuery = data.filter((item) => item._id !== id);
              setData(remainingQuery);

              fetch(`https://b9-a11.vercel.app/decrease/${queryId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="flex flex-col max-w-[1175px] mx-auto my-10">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Recommended Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {item.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {item.recommendedProduct}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          onClick={() => handleDelete(item._id, item.queryId)}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecommendation;
