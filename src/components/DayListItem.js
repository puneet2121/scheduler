import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    let result = `${spots} spot`
    if (spots === 0 || spots >= 2) {
      let number = spots === 0 ? 'no' : spots
      result = `${number} spots`
    }
    return result;
  }
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  return (
    <li className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
      data-testid="day">
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}