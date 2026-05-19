import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onUpdateLikes, onDeleteToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onUpdateLikes={onUpdateLikes}
          onDeleteToy={onDeleteToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
