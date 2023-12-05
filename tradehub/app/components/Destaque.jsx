"use client";
import "./destaque.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Destaque() {
  return (
    <>
      <div className="destaqueCard">
        <div className="destaqueTitle">
          <span>Destaque</span>
          <FontAwesomeIcon className="destaqueTitleIcon" icon={faFilter} />
        </div>
        <div className="destaqueVermelho">
          <FontAwesomeIcon className="" icon={faArrowDown} />
          <span>KLBN4 -5.97%</span>
        </div>
        <div className="destaqueVerde">
          <FontAwesomeIcon className="" icon={faArrowUp} />
          <span>CIEL3 7.96%</span>
        </div>
        <div className="destaqueVermelho">
          <FontAwesomeIcon className="" icon={faArrowDown} />
          <span>PETR4 -2.13%</span>
        </div>
        <div className="destaqueVerde">
          <FontAwesomeIcon className="" icon={faArrowUp} />
          <span>HCTR11 1.64%</span>
        </div>
        <div className="destaqueVermelho">
          <FontAwesomeIcon className="" icon={faArrowDown} />
          <span>GOGL34 -0.51%</span>
        </div>
        <div className="destaqueVerde">
          <FontAwesomeIcon className="" icon={faArrowUp} />
          <span>MXRF11 0.29%</span>
        </div>
        <div className="destaqueVermelho">
          <FontAwesomeIcon className="" icon={faArrowDown} />
          <span>ITSA4 -0.10%</span>
        </div>
        <div className="destaqueVerde">
          <FontAwesomeIcon className="" icon={faArrowUp} />
          <span>SPTW11 0.51%</span>
        </div>
      </div>
    </>
  );
}
