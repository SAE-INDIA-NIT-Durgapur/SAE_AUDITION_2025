import React, { useEffect } from "react";
import "./Timeline.css";

const Timeline = () => {
  useEffect(() => {
    const timeline = document.querySelector(".timeline");
    const timelineContainers = document.querySelectorAll(".timeline-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            timeline.classList.add("show-line");
            timeline.classList.remove("hide-line");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );

    timelineContainers.forEach((container) => observer.observe(container));

    const handleScroll = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const top = timelineRect.top;
      const bottom = timelineRect.bottom;

      if (top > window.innerHeight / 2 || bottom < window.innerHeight / 2) {
        timeline.classList.remove("show-line");
        timeline.classList.add("hide-line");
      } else {
        timeline.classList.add("show-line");
        timeline.classList.remove("hide-line");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-black w-full h-auto font-serif audition-flow-container">
      <h1 className=" font-medium text-3xl md:text-6xl   bg-clip-text text-[rgb(166,4,4)] text-center mb-7">
        Audition Flow
      </h1>
      <div className="timeline hide-line bg-black">
        <div className="timeline-container left">
          <div className="timelinecontent-link">
            <div className="timeLineContent">
              {/* <span className="icon">
                <i className="fas fa-map-marked-alt"></i>
              </span>{""} */}
              Simple Aptitute test
            </div>
          </div>
        </div>
        <div className="timeline-container right">
          <div className="timelinecontent-link">
            <div className="timeLineContent">
              {/* <span className="icon">
                <i className="fas fa-filter"></i>
              </span>{" "} */}
              Task Review 1
            </div>
          </div>
        </div>
        <div className="timeline-container left">
          <div className="timelinecontent-link">
            <div className="timeLineContent">
              {/* <span className="icon">
                <i className="fas fa-user"></i>
              </span>{" "} */}
              Task Review 2
            </div>
          </div>
        </div>
        <div className="timeline-container right">
          <div className="timelinecontent-link">
            <div className="timeLineContent">
              {/* <span className="icon">
                <i className="fas fa-phone-alt"></i>
              </span>{" "} */}
              Group Discussion
            </div>
          </div>
        </div>

        <div className="timeline-container left">
          <div className="timelinecontent-link">
            <div className="timeLineContent">
              {/* <span className="icon">
                <i className="fas fa-heart"></i>
              </span>{" "} */}
              Final Interview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
