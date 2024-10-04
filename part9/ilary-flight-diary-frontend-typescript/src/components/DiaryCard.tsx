import { DiaryEntry } from '../types';

const DiaryCard = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <section key={diary.id}>
      <p style={{ fontWeight: 700 }}>{diary.date}</p>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
      <div>comment: {diary.comment}</div>
    </section>
  );
};

export default DiaryCard;
