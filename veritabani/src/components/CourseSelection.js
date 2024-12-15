import React, { useState } from "react";
//ders seçim sayfası

const CourseSelection = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelection = () => {
    if (!isSelected) {
      setIsSelected(true);
      alert("Ders seçimi kaydedildi ve onay bekliyor.");
    } else {
      alert("Ders seçimi zaten yapilmiş.");
    }
  };

  return (
    <div className="container">
      <h2>Ders Seçim Sayfasi</h2>
      <p>
        {isSelected
          ? "Ders seçimi yapilmiş durumda."
          : "Henüz ders seçimi yapilmadi."}
      </p>
      <button onClick={handleSelection} disabled={isSelected}>
        Ders Seç
      </button>
    </div>
  );
};

export default CourseSelection;