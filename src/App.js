import React, { useState } from 'react';
import './style.css';
const toxicity = require('@tensorflow-models/toxicity');
export default function App() {
  const [comment, setComment] = useState();
  const [image, setImage] = useState(
    `https://i.picsum.photos/id/575/200/300.jpg?hmac=sopd2rAqqxeAtI5YKmESfglb3av7FRnaTdo3woj1uEM`
  );

  const changeImage = () => {
    fetch(`https://picsum.photos/${200}/300`)
      .then((res) => {
        setImage(res.url);
      })
      .catch((err) => {
        console.log('soorryy error..');
      });
  };
  function check() {
    const threshold = 0.9;
    toxicity.load(threshold).then((model) => {
      const sentences = [comment];

      model.classify(sentences).then((predictions) => {
        const entry = [];
        predictions.map((val1, idx) => {
          val1.results.map((val, idx) => {
            entry.push(val.match);
          });
        });

        if (entry.includes(true)) {
          alert('sorrry you comment is toxic');
        } else {
          //further process
          alert('comment sent......');
          setComment('');
        }
      });
    });
  }

  return (
    <div className="main">
      <img src={image} alt="" />
      <button onClick={changeImage}>new image</button>
      <div className="sec">
        <input
          type="text"
          className="comment"
          placeholder="drop your comment here"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
        {comment ? (
          <button onClick={check}>send</button>
        ) : (
          <button>send</button>
        )}
      </div>
    </div>
  );
}
