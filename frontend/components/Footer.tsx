import React from "react";

const Footer: React.FC = () => {
  return (
    <section className="section">
      <footer className="has-text-centered leading-4 text-slate-700">
        <p>
          NEARSpring Challenge #3. NFT + frontend
          {` | `}
          <a
            className="text-teal-500"
            href="https://github.com/Phonbopit/nearspring-challenge3-nft"
          >
            Source Code
          </a>
        </p>
      </footer>
    </section>
  );
};

export default Footer;
