import { useMeetups } from "../../hooks/useMeetups";
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.scss";

export default function Home() {
  const { meetups, loading, error } = useMeetups();

  return (
    <>
      <Header />
      <div className="page-container">
        <SearchBar />
        {loading ? (
          <div className="loading-message">Loading meetups...</div>
        ) : error ? (
          <div className="error-message">
            {error}
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <MeetupBoard meetups={meetups} />
        )}
      </div>
    </>
  );
}
