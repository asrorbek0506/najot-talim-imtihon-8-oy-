import { AboutHero } from "../components/about/AboutHero";
import { MissionVision } from "../components/about/MissionVision";
import { Timeline } from "../components/about/Timeline";
import { Team } from "../components/about/Team";
import { Achievements } from "../components/about/Achievements";
import { JoinUs } from "../components/about/JoinUs";

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