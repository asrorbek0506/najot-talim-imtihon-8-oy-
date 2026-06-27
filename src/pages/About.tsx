import { AboutHero } from "../components/About/AboutHero";
import { MissionVision } from "../components/About/MissionVision";
import { Timeline } from "../components/About/Timeline";
import { Team } from "../components/About/Team";
import { Achievements } from "../components/About/Achievements";
import { JoinUs } from "../components/About/JoinUs";

const About = () => {
  return (
    <div className="space-y-16 py-10 px-6">
      <AboutHero />
      <MissionVision />
      <Timeline />
      <Team />
      <Achievements />
      <JoinUs />
    </div>
  );
};

export default About;