import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebase";
import "./css/Home.css";
import img from "../img/Floydfeske.png";

function Home() {
  const [featuredSong, setFeaturedSong] = useState({
    url: "",
    title: "",
    artist: "",
  });
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertYouTubeUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?rel=0`;
    }
    return null;
  };

  useEffect(() => {
    const fetchFeaturedSong = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, "featuredSong", "PaCLJAsefuxCBZKb4450");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFeaturedSong(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching featured song: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSong();
  }, []);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const db = getFirestore(app);
        const newsRef = collection(db, "news");
        const q = query(newsRef, orderBy("date", "desc"));
        const newsSnap = await getDocs(q);

        if (!newsSnap.empty) {
          let news = [];
          newsSnap.forEach((doc) => {
            news.push({ id: doc.id, ...doc.data() });
          });
          setLatestNews(news);
        } else {
          console.log("No news items found");
        }
      } catch (error) {
        console.error("Error fetching latest news: ", error);
      }
    };

    fetchLatestNews();
  }, []);

  const renderIframe = () => {
    const embedUrl = convertYouTubeUrl(featuredSong.url);
    if (!embedUrl) {
      return <p>The provided URL is not a valid YouTube URL.</p>;
    }
    return (
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };

  const renderLatestNews = () => {
    return latestNews.map((newsItem) => (
      <div key={newsItem.id} className="news-item">
        <h3>{newsItem.title}</h3>
        <p>{newsItem.content}</p>
        <small>{newsItem.date.toDate().toLocaleDateString()}</small>
      </div>
    ));
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to Floyd Feske's Official Website</h1>
      <section className="image-section">
        <img src={img} alt="Description of the image" />
        <p>Explore the musical journey of Floyd Feske</p>
      </section>
      <p>Dive into the world of Floyd Feske and explore his musical journey.</p>

      <section>
        <h2>Featured Song</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {renderIframe()}
            <p>
              {featuredSong.title} by {featuredSong.artist}
            </p>
          </div>
        )}
      </section>

      <section>
        <h2>Latest News</h2>
        <p>Stay updated with the latest news and events about Floyd Feske.</p>
        {renderLatestNews()}
      </section>
    </div>
  );
}

export default Home;
