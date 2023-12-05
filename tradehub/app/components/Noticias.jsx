"use client";
import "./noticias.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";

export default function Noticias() {
  return (
    <>
      <div className="noticiasCard">
        <div className="noticiaTitleBlock">
          <span>Notícias</span>
          <FontAwesomeIcon className="noticiaTitleIcon" icon={faBell} />
        </div>
        <div className="noticia">
          <FontAwesomeIcon className="noticiaIcon" icon={faUser} />
          <div>
            <p className="noticiaTitle">AAPL34 despenca!</p>
            <p className="noticiaTime">15 minutos atrás</p>
          </div>
        </div>
        <div className="noticia">
          <FontAwesomeIcon className="noticiaIcon" icon={faUser} />
          <div>
            <p className="noticiaTitle">BBAS3 atrasa dividendos</p>
            <p className="noticiaTime">27 minutos atrás</p>
          </div>
        </div>
        <div className="noticia">
          <FontAwesomeIcon className="noticiaIcon" icon={faUser} />
          <div>
            <p className="noticiaTitle">MXRF11 sobe!</p>
            <p className="noticiaTime">42 minutos atrás</p>
          </div>
        </div>
        <div className="noticia">
          <FontAwesomeIcon className="noticiaIcon" icon={faUser} />
          <div>
            <p className="noticiaTitle">Fim da PETR4?</p>
            <p className="noticiaTime">1 hora atrás</p>
          </div>
        </div>
        <div className="noticia">
          <FontAwesomeIcon className="noticiaIcon" icon={faUser} />
          <div>
            <p className="noticiaTitle">ITSA4 surpreende!</p>
            <p className="noticiaTime">2 horas atrás</p>
          </div>
        </div>
        <div className="noticiaFooter">
          <p className="carregar">Carregar Mais</p>
        </div>
      </div>
    </>
  );
}
