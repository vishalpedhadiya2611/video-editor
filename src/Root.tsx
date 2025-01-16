import "./tailwind.css";
import { Composition } from "remotion";
import { myCompSchema, VideoComposition } from "./VideoComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VideoComposition"
        component={VideoComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Test Task",
          titleColor: "#000000",
        }}
      />
    </>
  );
};
