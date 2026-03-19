import { useEffect, useState } from "react";
import { useCourseStore, useStore } from "../store/useCourseStore";
import { sendToBackend } from "../lib/photinoEvents";

export default function DataPage() {
  const courses = useCourseStore((state) => state.courses);
  const addCourse = useCourseStore((state) => state.addCourse);

  const count = useStore((state) => state.count);
  const incrementInDb = useStore((state) => state.incrementInDb);

  const handleClick = () => {
    incrementInDb();
  };

  const handleClick2 = () => {
    addCourse();
  };

  return (
    <div>
      <button onClick={handleClick} className="hover:bg-amber-50">
        asdjlkasd
      </button>
      <br></br>
      {count}
      <br></br>
      <button onClick={handleClick2} className="hover:bg-amber-50">
        ss
      </button>
      <br></br>
      {courses}
    </div>
  );
}
