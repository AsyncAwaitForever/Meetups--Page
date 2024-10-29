import "./review.scss";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";

const Review = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="reviewContainer">
        <h1 className="reviewTitle">fdfsd</h1>
        <div className="starsRating"></div>
        <input type="text" className="reviewTextInput" />
        <button className="reviewButton">Submit</button>
      </div>
    </div>
  );
};

export default Review;
