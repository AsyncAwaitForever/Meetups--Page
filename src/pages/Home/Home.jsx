import "./home.scss";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import MeetupCard from "../../components/MeetupCard/MeetupCard";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <SearchBar />
      <MeetupBoard />
      <MeetupCard />
    </div>
  );
}
