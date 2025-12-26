import React from "react";
import { Link } from "react-router-dom";

const Card = ({ img, title, btn, navi }) => {
  return (
    <div className="card" style={{ width: "16rem", borderRadius: "10%" }}>
      <div className="text-center mt-3">
        <img
          src={img}
          className="card-img-top"
          alt={title}
          style={{ width: "12rem" }}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title text-center mb-5">{title}</h5>

        <div className="text-center">
          <Link to={navi} className="btn btn-primary">
            {btn}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
