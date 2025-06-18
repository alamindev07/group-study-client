// const Footer = () => {
//   return (
//     <footer className="footer footer-center p-4 bg-base-200 text-base-content mt-10">
//       <aside>
//         <p>
//           © {new Date().getFullYear()} GroupStudyHub. All rights reserved.
//         </p>
//       </aside>
//     </footer>
//   );
// };

// export default Footer;



import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content mt-10">
      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Address Section */}
        <div>
          <h2 className="font-bold text-lg mb-2">Contact Us</h2>
          <p>GroupStudyHub</p>
          <p>123 Study Lane, Learning City</p>
          <p>Email: support@groupstudyhub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="font-bold text-lg mb-2">Legal</h2>
          <ul className="space-y-2">
            <li>
              <a href="/privacy-policy" className="link link-hover">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="link link-hover">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h2 className="font-bold text-lg mb-2">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <a href="https://www.facebook.com/babu.al.amin.386938" target="_blank" rel="noreferrer" className="hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-500">
              <FaTwitter />
            </a>
            <a href="https://github.com/alamindev07" target="_blank" rel="noreferrer" className="hover:text-gray-700">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>

          <div className=" py-4 border-t border-base-300">
        <p>© {new Date().getFullYear()} GroupStudyHub. All rights reserved.</p>
      </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;

