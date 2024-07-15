import AllQueriesHome from "../components/AllQueriesHome";
import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";
import OurVision from "../components/OurVision";

const Homepage = () => {
  return (
    <>
      <Banner />
      <div className="text-center mt-10 text-3xl font-extrabold">
        All Queries
      </div>
      <AllQueriesHome />
      <ContactUs />
      <OurVision />
    </>
  );
};

export default Homepage;
