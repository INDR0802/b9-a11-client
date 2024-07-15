const Banner = () => {
  return (
    <div className="max-w-[1175px] mx-2 lg:mx-auto mt-5 relative ">
      <div className="carousel w-full h-[500px] rounded-xl ">
        <div id="slide1" className="carousel-item relative w-full ">
          <img
            src="https://i.ibb.co/gVFPR7K/Uniever-2.png"
            className="w-full "
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://i.ibb.co/DCZvxr8/product.webp" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co/7Jv8X2t/poznan-poland-apr-6-2018-bottles-of-global-soft-drink-brands-including-products-of-coca-cola-company.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co/4jH6JQ3/1701005474101.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      <div className="absolute top-0 text-orange-100 bg-gradient-to-r from-gray-800  to-transparent lg:py-[205px] py-[158px] lg:pl-[100px] pl-[20px] rounded-xl">
        <h1 className="text-6xl">Welcome to AlterPro</h1>
        <p className="text-2xl">Here You Will find your alternative products</p>
      </div>
    </div>
  );
};

export default Banner;
