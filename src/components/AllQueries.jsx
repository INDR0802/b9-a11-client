import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllQueries = () => {
  const [data, setData] = useState([]);
  const [col, setCol] = useState(3);
  console.log(col);

  useEffect(() => {
    fetch("https://b9-a11.vercel.app/allqueries")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="max-w-[1275px] mx-auto">
      <div className="hidden lg:flex gap-10 justify-center">
        <button
          onClick={() => setCol(1)}
          className=" bg-orange-400 h-10 pb-1 px-10 rounded-xl border-2 border-orange-600 text-2xl">
          1
        </button>
        <button
          onClick={() => setCol(2)}
          className=" bg-orange-400 h-10 pb-1 px-10 rounded-xl border-2 border-orange-600 text-2xl">
          2
        </button>
        <button
          onClick={() => setCol(3)}
          className=" bg-orange-400 h-10 pb-1 px-10 rounded-xl border-2 border-orange-600 text-2xl">
          3
        </button>
      </div>
      <div
        className={`grid ${
          col == 1
            ? "lg:grid-cols-1"
            : col == 2
            ? "lg:grid-cols-2"
            : "lg:grid-cols-3"
        } gap-5 my-10 mx-auto`}>
        {data.map((item) => {
          return (
            <div
              key={item._id}
              className="mx-auto card w-96 bg-base-100 shadow-xl relative">
              <div className="flex justify-around mt-5 items-center mx-2">
                <h1 className="absolute top-0 -right-2 bg-red-500 rounded-full pl-[15px] pt-1 text-2xl h-10 w-10">
                  {item.recommendationCount}
                </h1>
                <img
                  src={item.photoURL}
                  alt=""
                  className="rounded-full size-12"
                />
                <h1 className="font-bold">{item.displayName}</h1>
              </div>
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
                  <Link to={`/details/${item._id}`} className="btn btn-warning">
                    Recommend
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllQueries;
