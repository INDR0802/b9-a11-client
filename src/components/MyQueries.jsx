import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/AuthProvider";
import Swal from "sweetalert2";

const MyQueries = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  const { email } = user || {};

  useEffect(() => {
    fetch(`https://b9-a11.vercel.app/myqueries/${email}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [email]);

  const handleDelete = (id) => {
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
        fetch(`https://b9-a11.vercel.app/deletequery/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((del) => {
            if (del.deletedCount > 0) {
              const remainingQuery = data.filter((item) => item._id !== id);
              setData(remainingQuery);
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
    <div className="max-w-[1175px] mx-auto">
      <div>
        <Link
          to={"/addQuery"}
          className="btn btn-info mt-2 lg:ml-[45%] ml-[40%]">
          Add Query
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 my-10 mx-auto">
        {data.map((item) => {
          return (
            <div
              key={item._id}
              className="card w-96 bg-base-100 shadow-xl mx-auto">
              <figure className="px-10 pt-10">
                <img
                  src={item.image}
                  alt="Shoes"
                  className="rounded-xl h-[250px]"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.title}</p>
                <div className="card-actions">
                  <Link to={`/details/${item._id}`} className="btn btn-primary">
                    Details
                  </Link>
                  <Link to={`/update/${item._id}`} className="btn btn-accent">
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-error btn-primary">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyQueries;
