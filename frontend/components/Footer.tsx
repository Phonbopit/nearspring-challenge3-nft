import React from "react";

const Footer: React.FC = () => {
  return (
    <section className="section">
      <footer className="has-text-centered leading-4 text-slate-700">
        <p className="mb-4">
          Made with ❤️ <span className="mx-1">By</span>
          <a
            href="https://twitter.com/phonbopit"
            target="_blank"
            rel="noreferrer noopener"
            className="has-text-info"
          >
            @phonbopit
          </a>
        </p>
        <p>
          <a
            href="https://nearspring.splashthat.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="has-text-black"
          >
            NEARSpring Challenge #3. NFT + frontend
          </a>
          {` | `}
          <a
            className="has-text-link"
            href="https://github.com/Phonbopit/nearspring-challenge3-nft"
            target="_blank"
            rel="noreferrer noopener"
          >
            Source Code
          </a>
        </p>
      </footer>
    </section>
  );
};

export default Footer;
