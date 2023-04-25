import React from "react";

const Rewardpoints = (props) => {
  return (
    <>
      <div className="points-box">
        <h1>Redeem for {props.reward.point} points</h1>
        {props.reward.gifts.map((g) => {
          return <p> {g} </p>;
        })}
      </div>
    </>
  );
};
export default Rewardpoints;
