import React from "react";
import YouTube from "react-youtube";
import { withTranslation } from "react-i18next";

const WhyPrintnGo = ({ t }) => {
  const opts = {
    height: "400",
    width: "100%"
  };
  return (
    <div
      className={`bg-leaf fullscreen border--bottom border-color--white justify-content--center text-white flex flex-direction--column align-items--center`}
    >
      <div
        style={{ width: "80%" }}
        className="content-container flex flex-direction--column"
      >
        <p className="title fullwidth m0 h3 favourite-font-weight mb3 center">
          {t("home.whyPrintnGo.title")}
        </p>

        <YouTube
          videoId={t('introduction_video_id')}
          opt={opts}
          className="youtube-iframe"
        />
      </div>
    </div>
  );
};

export default withTranslation()(WhyPrintnGo);
