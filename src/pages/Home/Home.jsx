import "./home.scss";
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  //här måste vi fixa med backenden detta är mockdata

  const meetups = [
    { id: 1, title: "Meet up one", description: "Description" },
    { id: 2, title: "Meet up two", description: "Description" },
    { id: 3, title: "Meet up three", description: "Description" },
    { id: 4, title: "Meet up four", description: "Description" },
  ];

  return (
    <>
      <Header />
      <div className="page-container">
        <SearchBar />
        <MeetupBoard meetups={meetups} />
      </div>
    </>
  );
}
