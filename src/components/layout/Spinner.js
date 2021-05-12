import React from "react";
import loading from "../../img/smoke-loading.svg";
import { Image } from "react-bootstrap";
export default function Spinner() {
  return <Image className="spinner-eclipse" src={loading} alt="Loading..." />;
}
