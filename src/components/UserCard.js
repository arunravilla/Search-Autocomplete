import React from "react";
import PropTypes from "prop-types";

import TextMarker from "./TextMarker";

const UserCard = ({
  isActive,
  _onMouseEnter,
  searchKeyword,
  item,
  userCardRef,
  idx
}) => (
  <li
    ref={userCardRef}
    className={isActive ? "active" : ""}
    onMouseEnter={() => _onMouseEnter(idx)}
  >
    <TextMarker
      customClass="user_id"
      text={item.id}
      highlight={searchKeyword}
    />
    <TextMarker
      customClass="user_name"
      text={item.name}
      highlight={searchKeyword}
    />
    {item.matchingItem && (
      <div className="user_list_item">{`"${item.matchingItem}" found in items`}</div>
    )}
    <TextMarker
      customClass="user_address"
      text={item.address}
      highlight={searchKeyword}
    />
  </li>
);

UserCard.propTypes = {
  isActive: PropTypes.bool,
  _onMouseEnter: PropTypes.func,
  searchKeyword: PropTypes.string,
  item: PropTypes.object,
  userCardRef: PropTypes.func,
  idx: PropTypes.number
};
export default React.forwardRef((props, ref) => (
  <UserCard userCardRef={ref} {...props} />
));
