interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  return <span>{score}</span>;
};

export default CriticScore;
