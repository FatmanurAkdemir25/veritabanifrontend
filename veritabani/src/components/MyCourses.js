import React from "react";
//derslerim sayfası

const MyCourses = ({ courses }) => {
  return (
    <div className="container">
      <h2>Derslerim</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            {course.name} - {course.type} ({course.quota} kontenjan kaldı)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCourses;