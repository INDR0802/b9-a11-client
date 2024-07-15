import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center py-10 bg-gray-800  text-white">
        <div className="navbar-start flex items-center mb-[-15px] lg:mb-0 gap-2 justify-center ">
          <img src="/icon.jpeg" alt="" className="size-20 rounded-full" />
          <h1 className="text-3xl md:text-5xl">AlterPro</h1>
        </div>
        <p className="text-md">
          ArtisanAvenue: Crafting Creativity, One Piece at a Time!
        </p>
        <nav>
          <div className="grid grid-flow-col gap-6">
            <a>
              <FaTwitter color="white" size={30} />
            </a>
            <a>
              <FaFacebook color="white" size={30} />
            </a>
            <a>
              <IoLogoYoutube color="white" size={30} />
            </a>
            <a>
              <FaLinkedin color="white" size={30} />
            </a>
            <a>
              <FaSquareInstagram color="white" size={30} />
            </a>
          </div>
        </nav>
        <aside>
          <p className="mt-5">2024, All Rights Reserved.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
