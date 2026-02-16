import "../../styles/Mcm_Problems.css";

const problemsData = [
  {
    id: "A",
    title: "Modeling Smartphone Battery Drain",
    pdf: "https://drive.google.com/file/d/1rIWFTH2r0HRgw7UkusUSdBqE2fvpnlI9/view",
    solutions: "https://drive.google.com/drive/folders/1TmqsAB8C5qz-vw4jbM1D5F1s17ngFXZa"
  },
  {
    id: "B",
    title: "Creating a Moon Colony using a Space Elevator System",
    pdf: "https://drive.google.com/file/d/1k-jRx3h8Aw3F3SfcMunum0LeyuSzKevU/view",
    solutions: null
  },
  {
    id: "C",
    title: "Data with the stars",
    pdf: "https://drive.google.com/file/d/1SUN2qC007uqtMlQ3OQp9VSkABG6Zkp1A/view",
    solutions: "https://drive.google.com/drive/folders/10XGBfsKn2J2k5B4l4l06Qhg9PhBmAOHq"
  },
  {
    id: "D",
    title: "Managing Sports for Success",
    pdf: "https://drive.google.com/file/d/1niUeVm2fz4OgYmpzjrh4QHABIcNbO07x/view",
    solutions: "https://drive.google.com/drive/folders/1I0SmKd60674Si-nhqrtf8c65aLlMKSC3"
  },
  {
    id: "E",
    title: "Passive Solar Shading",
    pdf: "https://drive.google.com/file/d/1LHrDbSqfhWX-fPaedPHZARA-WAWkY5g3/view",
    solutions: null
  },
  {
    id: "F",
    title: "To Gen-AI, or Not To Gen-AI (or how to Gen-AI)?",
    pdf: "https://drive.google.com/file/d/1VpIWqBCb3wTi4xa4fU-si10qAol7fu_E/view",
    solutions: "https://drive.google.com/drive/folders/19pv2rq1OqmIRmogfkg95sjsF0-ZlH-yH"
  }
];

const Mcm_Problems = () => {
  return (
    <div className="problems-page">
      <h2 className="page-title">MCM/ICM 2026 - Official Problem Statements</h2>

      <div className="problems-grid">
        {problemsData.map((problem) => (
          <div key={problem.id} className="problem-card">
            <h5 className="problem-id">Problem {problem.id}</h5>

            <h3 className="problem-title">{problem.title}</h3>

            <a
              href={problem.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
            >
              View Problem
            </a>

            {problem.solutions ? (
              <a
                href={problem.solutions}
                target="_blank"
                rel="noopener noreferrer"
                className="solution-link"
              >
                View Solutions
              </a>
            ) : (
              <span className="no-solution">No Solutions Yet</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mcm_Problems;
