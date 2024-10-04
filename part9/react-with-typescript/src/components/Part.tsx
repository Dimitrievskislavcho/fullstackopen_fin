import { assertNever, CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  let partContentBasedOnKind: JSX.Element = <></>;

  switch (part.kind) {
    case 'basic':
      partContentBasedOnKind = (
        <>
          <br />
          <em>{part.description}</em>
        </>
      );
      break;
    case 'background':
      partContentBasedOnKind = (
        <>
          <br />
          <em>{part.description}</em>
          <br />
          Submit to {part.backgroundMaterial}
        </>
      );
      break;
    case 'group':
      partContentBasedOnKind = (
        <>
          <br />
          project exercises {part.groupProjectCount}
        </>
      );
      break;
    case 'special':
      partContentBasedOnKind = (
        <>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </>
      );
      break;
    default:
      assertNever(part);
  }

  return (
    <p key={part.name}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      {partContentBasedOnKind}
    </p>
  );
};

export default Part;
