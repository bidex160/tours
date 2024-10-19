import { useEffect, useState } from "react";
import Tours from "./Tours";
import Loading from "./Loading";
const url = "https://www.course-api.com/react-tours-project";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const filterTours = tours.filter((tour) => tour.id !== id);
    setTours(filterTours);
  };

  const fetchTours = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setIsLoading(false);
        return;
      }
      const fetchedTours = await response.json();
      setTours(fetchedTours);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
