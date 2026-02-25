const { useState } = React;

const winning_combinations = [
  [0,1,2],[3,4,5],[6,7,8],[0,3,6],
  [1,4,7],[2,5,8],[0,4,8],[2,4,6]];

export function Board() {
  const [state, setState] = useState({
    selections: Array(9).fill(null),
    activePlayer: "S"
  });
  const [msg, setMsg] = useState("");
  const HandleClick = (key) => {
    if (state.selections[key] || msg !== "") {
      return 
    }
    setState(s => {
      const cp = [...s.selections];
      cp[key] = s.activePlayer;
      const draw = cp.every(x => x !== null);
      const winner = winning_combinations.some(
        combo => cp[combo[0]] === "S" && cp[combo[1]] === "O" && cp[combo[2]] === "S");
      if (winner) {
        setMsg("Winner: " + s.activePlayer);
      } else if (draw) {
        setMsg("It's a Draw");
      }
      return {
        activePlayer: s.activePlayer === "S" ? "O" : "S",
        selections: cp
      };
    })
  }
  const reset = () => {
    setState({
      selections: Array(9).fill(null),
      activePlayer: "S"
    });
    setMsg("");
  }
  return <>
    <h1>SOS Game</h1>
    <div className="msg status">{msg}</div>
    <div className="squares">
      {state.selections.map((x, i) =>
        <button className="square" onClick={
          () => HandleClick(i)} key={i}>{x}</button>
      )}
    </div>
    <button type="reset" id="reset"
      onClick={reset}>Reset</button>
  </>;
}