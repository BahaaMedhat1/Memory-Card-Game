export const WinMessage = ({ move }) => {
  return (
    <div className="win-message">
      <h1>Congratulations!</h1>
      <p>You Completed The Game in {move} Moves</p>
    </div>
  );
};
