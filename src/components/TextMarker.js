import React from "react";
import PropTypes from "prop-types";

/**
 * Hightlights the givens text on a string
 *
 * @param {*} { text, keyword, customClass = "" }
 * @returns node - Either returns highlighted text or default text
 */
const TextMarker = ({ text, keyword, customClass = "" }) => {
  let regex = new RegExp(`^(${keyword}).*$`, "i");
  var match = regex.test(text);

  if (!match) return <div className={customClass}>{text}</div>;

  return (
    <div className={customClass}>
      <big>{text.substring(0, keyword.length)}</big>
      {text.substring(keyword.length)}
    </div>
  );
};

TextMarker.prototype = {
  text: PropTypes.string,
  keyword: PropTypes.string,
  customClass: PropTypes.string
};
export default TextMarker;
