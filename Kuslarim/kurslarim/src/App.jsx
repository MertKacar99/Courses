import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Courses from "./Courses";
import Loading from "./Loading";

//! Axios import ettik Terminal

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteCourse = (id) => {
    const afterDeletedCourses = courses.filter((course) => course.id !== id);
    setCourses(afterDeletedCourses);
  };
  const fetchCourses = async () => {
    //? Tüm datanın gelmesini beklemesini istediğim için await ve async ekledim.
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/courses"); //? istek atılan Link
      setCourses(response.data); //! Datayı backend den çekip set ettik.
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []); //? UseEffect boş array  tanımlanırak bir kere çalışmasını sağlıyoruz.
  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          {courses.length === 0 ? (
            <div className="refleshDiv">
              <h2>Kursların Hepsini Sildin !</h2>
              <button className="CardDeleteBtn"
                onClick={() => {
                  fetchCourses();
                }}
              >
                Yenile
              </button>
            </div>
          ) : (
            <Courses courses={courses} removeCourse={deleteCourse} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
