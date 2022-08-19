import { useState, useEffect } from "react";

function Form() {
  const [allMemeImages, setAllMemeImages] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1g8my4.jpg",
  });

  function OnClick() {
    const random = Math.floor(Math.random() * allMemeImages.length);

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: allMemeImages[random].url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  return (
    <div>
      <div className="sub-form">
        <div className="input-field">
          <input
            type="text"
            className="top-text"
            name="topText"
            defaultValue={meme.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            className="bottom-text"
            name="bottomText"
            defaultValue={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button" onClick={OnClick}>
          Get a new meme image
        </button>
      </div>

      <div className="image-container">
        <h2 className="text-top">{meme.topText}</h2>
        <img
          src={meme.randomImage}
          alt="image.png"
          className="meme-image"
        ></img>
        <h2 className="text-bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}

export default Form;
