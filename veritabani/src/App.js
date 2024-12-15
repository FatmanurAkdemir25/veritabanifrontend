import React, { useState } from "react";
import CourseSelection from "./components/CourseSelection";
import MyCourses from "./components/MyCourses";
import Confirmation from "./components/Confirmation";
import LogoutButton from "./components/LogoutButton";
import "./styles.css";
//ana bileşen

const App = () => {
  const [page, setPage] = useState("selection");
  const [courses] = useState([
    { name: "Yapay Zeka", type: "Zorunlu", quota: 8 },
    { name: "Web Programlama", type: "Seçmeli", quota: 6 },
  ]);

  const handleLogout = () => {
    alert("Oturum kapatildi.");
    setPage("selection");
  };

  return (
    <div>
      <header>
        <h1>Ders Seçim Sistemi</h1>
      </header>
      {page === "selection" && <CourseSelection />}
      {page === "courses" && <MyCourses courses={courses} />}
      {page === "confirmation" && <Confirmation />}
      <LogoutButton onLogout={handleLogout} />
      <div className="nav-buttons">
        <button onClick={() => setPage("selection")}>Ders Seçim Sayfasi</button>
        <button onClick={() => setPage("courses")}>Derslerim</button>
        <button onClick={() => setPage("confirmation")}>
          Seçim Onay Sayfasi
        </button>
      </div>
    </div>
  );
};

export default App;