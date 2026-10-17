"use client";

import { ChevronDown, Clock3, Play, Video } from "lucide-react";
import { useState } from "react";
import type { CourseLesson } from "../../data/courses";

export default function CourseLessonAccordion({ lessons }: { lessons: CourseLesson[] }) {
  const [openLesson, setOpenLesson] = useState(lessons[0]?.id ?? "");

  return <div className="course-lessons">
    {lessons.map((lesson, index) => {
      const isOpen = openLesson === lesson.id;
      const panelId = `${lesson.id}-panel`;
      return <article className={`course-lesson${isOpen ? " course-lesson-open" : ""}`} key={lesson.id}>
        <h3>
          <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenLesson(isOpen ? "" : lesson.id)}>
            <span className="course-lesson-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="course-lesson-title"><small>Lesson {index + 1}</small>{lesson.title}</span>
            <ChevronDown size={20} aria-hidden="true" />
          </button>
        </h3>
        {isOpen && <div className="course-lesson-panel" id={panelId}>
          {lesson.youtubeId ? <div className="course-video"><iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(lesson.youtubeId)}`} title={lesson.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
          : <div className="course-video course-video-placeholder"><span><Play size={28} fill="currentColor" /></span><strong>Lesson video coming soon</strong><p>This lesson is ready for its verified video link.</p></div>}
          <div className="course-lesson-note"><Video size={18} /><div><strong>{lesson.title}</strong><p>Watch this lesson, take notes and continue to the next topic when you are ready.</p></div><span><Clock3 size={15} /> Self-paced</span></div>
        </div>}
      </article>;
    })}
  </div>;
}
