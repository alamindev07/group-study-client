const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content mt-10">
      <aside>
        <p>
          © {new Date().getFullYear()} GroupStudyHub. All rights reserved.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
