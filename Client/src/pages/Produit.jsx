import React from "react";
import { useParams } from "react-router-dom";
import DetailProduit from "../components/DetailProduit";

export default function Produit(){
  const { id } = useParams();
  return (
    <div>
      <DetailProduit id={id} />
    </div>
  );
}
