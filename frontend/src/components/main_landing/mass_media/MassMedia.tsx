import "./MassMedia.css";
import React from "react";

const MassMedia: React.FC = () => {
  return (
    <section className="mass-media">
      <h3 className="mass-media__title">Про меня пишут в СМИ</h3>
      <p className="mass-media__description">
        Статьи моих разработчиков стали очень популярными, собрав сотни тысяч
        просмотров. Также про меня пишут классные издания, за что им большое
        спасибо =)
      </p>
      <div className="mass-media__content">
        <a className="mass-media__link mass-media__link_type_vc" href="/" />
        <a className="mass-media__link mass-media__link_type_rbc" href="/" />
        <a className="mass-media__link mass-media__link_type_rg" href="/" />
        <a className="mass-media__link mass-media__link_type_rb" href="/" />
      </div>
    </section>
  );
};

export default MassMedia;
