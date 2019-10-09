export const scrollIntoView = function(element) {
  if (!element) return null;
  if (element.scrollIntoView) {
    element.scrollIntoView({
      behaviour: "smooth",
      block: "nearest"
    });
  } else {
    var parent = element.parentNode,
      parentComputedStyle = window.getComputedStyle(parent, null),
      parentBorderTopWidth = parseInt(
        parentComputedStyle.getPropertyValue("border-top-width")
      ),
      parentBorderLeftWidth = parseInt(
        parentComputedStyle.getPropertyValue("border-left-width")
      ),
      overTop = element.offsetTop - parent.offsetTop < parent.scrollTop,
      overBottom =
        element.offsetTop -
          parent.offsetTop +
          element.clientHeight -
          parentBorderTopWidth >
        parent.scrollTop + parent.clientHeight,
      overLeft = element.offsetLeft - parent.offsetLeft < parent.scrollLeft,
      overRight =
        element.offsetLeft -
          parent.offsetLeft +
          element.clientWidth -
          parentBorderLeftWidth >
        parent.scrollLeft + parent.clientWidth;

    if (overTop || overBottom) {
      parent.scrollTop =
        element.offsetTop -
        parent.offsetTop -
        parent.clientHeight / 2 -
        parentBorderTopWidth +
        element.clientHeight / 2;
    }

    if (overLeft || overRight) {
      parent.scrollLeft =
        element.offsetLeft -
        parent.offsetLeft -
        parent.clientWidth / 2 -
        parentBorderLeftWidth +
        element.clientWidth / 2;
    }
  }
};
