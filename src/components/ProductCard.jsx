import React from "react";
import noImageURL from "./../images/no_image.png";
import ItemDetails from "./ItemDetails";

export default function ProductMain({ camp }) {
  return (
    <div key={camp.id} className="product product--w35">
      <img
        className="product__image"
        src={camp.data.firstImageUrl || noImageURL}
      />
      <div className="detail-list">
        {/* 야영장 이름 */}
        <ItemDetails type="title" size="large">
          <span>{camp.data.facltNm}</span>
        </ItemDetails>

        {/* 경기도 양평군 / #글램핑 #야영장 */}
        <ItemDetails type="text" color="gray">
          <span>
            {camp.data.doNm} {camp.data.sigunguNm}
          </span>
          <br />
          {camp.data.induty &&
            camp.data.induty.split(",").map((item, index) => (
              <span key={index}>
                #{item.trim()}
                {index !== camp.data.induty.split(",").length - 1 && " "}
              </span>
            ))}
        </ItemDetails>
        {/* <ItemDetails type="price" size="default" color="gray">
          {camp.data.siteMg1CoPrice} 원~
        </ItemDetails> */}
      </div>
    </div>
  );
}
