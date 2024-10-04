import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  contentParts: CoursePart[];
}

const Content = ({ contentParts }: ContentProps) => {
  return (
    <>
      {contentParts.map((course) => {
        return <Part key={course.name} part={course}></Part>;
      })}
    </>
  );
};

export default Content;
