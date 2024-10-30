import { useMeetups } from "../../hooks/useMeetups";
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.scss";

export default function Home() {
  const { meetups, loading, error } = useMeetups();

  console.log("Current meetups state:", meetups); // Debug log

  if (loading) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="loading-message">Loading meetups...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="error-message">
            {error}
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </>
    );
  }

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
