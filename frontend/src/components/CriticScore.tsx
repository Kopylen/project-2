interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  return <div>{score}</div>;
};

export default CriticScore;
