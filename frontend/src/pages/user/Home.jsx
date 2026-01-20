import "../../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
      <section id="hero" className="hero-section">

        <div className="hero-content">
          <p className="hero-dept">
            Department of Data Science and Business Systems
          </p>

          <p className="hero-invite">Cordially Invites To</p>

          <h1 className="hero-title">
            One-Day Mathematical Modelling Hackathon
          </h1>

          <p className="hero-subtitle">
            Shortlisting Teams for MCM / ICM 2026
          </p>

          <p className="hero-date">
            23rd January 2026 · SRMIST KTR
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
     <section id="about" className="about-section full-section">
        <div className="about-content">
          <h2 className="section-title">About</h2>
          <h3 className="section-subtitle">About the Contest</h3>

          <p className="about-text">
            The Department of Data Science and Business Systems at SRM Institute of
            Science and Technology (SRMIST) is organizing a one-day Mathematical
            Modelling Hackathon to identify and shortlist exceptional undergraduate
            teams to represent SRMIST at the International Mathematical Contest in
            Modelling (MCM) and the Interdisciplinary Contest in Modelling (ICM),
            scheduled for January 29 – February 2, 2026.
          </p>

          <p className="about-text">
            The MCM/ICM is an internationally recognized four-day competition in
            which teams of undergraduate students collaborate to develop innovative
            mathematical models addressing complex, real-world problems.
          </p>

          <p className="about-text">
            This SRMIST hackathon mirrors the core structure of the MCM/ICM,
            condensed into a single-day event to evaluate modelling, reasoning, and
            technical communication skills.
          </p>
        </div>
      </section>

      {/* ================= RULES ================= */}
      <section id="rules" className="rules-section full-section">
        <div className="rules-container">

          <h2 className="section-title">Rules & Regulations</h2>

          <p className="rules-intro">
            To emulate the expectations of the official MCM/ICM contest, the
            following rules will govern the one-day Mathematical Modelling
            Hackathon.
          </p>

          <div className="rules-grid">
            <div className="rule-card">
              <h3>Problem Access & Time Allocation</h3>
              <ul>
                <li>Six modelling problems released at the start.</li>
                <li>Exactly one problem must be selected.</li>
                <li>The solution can be submitted only once within the given time window.</li>
              </ul>
            </div>

            <div className="rule-card">
              <h3>Collaboration Restrictions</h3>
              <ul>
                <li>No faculty or external consultation.</li>
                <li>No online discussions or messaging platforms.</li>
                <li>Only the three team members may collaborate.</li>
              </ul>
            </div>

            <div className="rule-card">
              <h3>Permissible Resources</h3>
              <ul>
                <li>Online resources and AI tools are allowed.</li>
                <li>All sources must be properly acknowledged.</li>
                <li>External communication is strictly prohibited.</li>
              </ul>
            </div>

            <div className="rule-card">
              <h3>Modelling Expectations</h3>
              <ul>
                <li>Identify key variables and constraints.</li>
                <li>Develop appropriate mathematical models.</li>
                <li>Clearly justify modelling decisions.</li>
              </ul>
            </div>

            <div className="rule-card">
              <h3>Methodology</h3>
              <ul>
                <li>Explain analytical and computational techniques.</li>
                <li>Statistics, optimization, ML, or simulations may be used.</li>
                <li>Justify the suitability of each method.</li>
              </ul>
            </div>

            <div className="rule-card">
              <h3>Evaluation & Reflection</h3>
              <ul>
                <li>Discuss strengths and predictive capacity.</li>
                <li>Identify limitations and assumptions.</li>
                <li>Suggest possible improvements.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL SUBMISSION FLOW ================= */}
      <section className="submission-flow-section">
        <div className="submission-flow-container">

          <h2 className="section-title">Final Submission Requirements</h2>

          <p className="submission-flow-intro">
            Each team must prepare a <strong>5-page written report</strong> that
            adheres to the professional and academic standards of the
            <strong> International MCM / ICM competition</strong>.
          </p>

          <div className="submission-flow">
            <div className="flow-line"></div>

            <div className="flow-item left">
              <span className="flow-node">1</span>
              <div className="flow-content">
                <h4>Executive Summary</h4>
                <p>
                  Concise overview of the selected problem, modelling approach,
                  key findings, and principal conclusions.
                </p>
              </div>
            </div>

            <div className="flow-item right">
              <span className="flow-node">2</span>
              <div className="flow-content">
                <h4>Model Description & Methodology</h4>
                <p>
                  Structured explanation of the mathematical model, assumptions,
                  and methods used to derive solutions.
                </p>
              </div>
            </div>

            <div className="flow-item left">
              <span className="flow-node">3</span>
              <div className="flow-content">
                <h4>Results & Analysis</h4>
                <p>
                  Presentation of outcomes supported by graphs, tables,
                  simulations, and interpretation of results.
                </p>
              </div>
            </div>

            <div className="flow-item right">
              <span className="flow-node">4</span>
              <div className="flow-content">
                <h4>Discussion of Model Limitations</h4>
                <p>
                  Critical evaluation of simplifying assumptions, missing
                  variables, and computational constraints.
                </p>
              </div>
            </div>

            <div className="flow-item left">
              <span className="flow-node">5</span>
              <div className="flow-content">
                <h4>Suggestions for Improvement</h4>
                <p>
                  Recommendations for refining, extending, or validating the
                  model in future work or applications.
                </p>
              </div>
            </div>
          </div>

          <p className="submission-flow-note">
            The report must be written clearly, professionally, and must not
            exceed <strong>five pages</strong>.
          </p>

        </div>
      </section>

    </div>
  );
};

export default Home;
