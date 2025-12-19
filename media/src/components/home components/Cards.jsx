import React from "react";
import { Link } from "react-router-dom";

const Card = ({ img, title, btn, navi }) => {
  return (
    <div className="card mb-5" style={{ width: "18rem", borderRadius: "10%" }}>
      <div className="text-center mt-3">
        <img
          src={img}
          className="card-img-top"
          alt="..."
          style={{ width: "12rem" }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title text-center mb-5">{title}</h5>
        <div className="text-center mb-2">
          <Link to={navi}>
            <a href="#" className="btn btn-primary">
              {btn}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
