import Cell from "./Cell";

interface LineProps {
  children: number[]
  y: number
}

export default function Line({ children, y }: LineProps) {
  return (
    <tr key={`row-${y}`}>
      {children.map((cell, x) => (
        <Cell key={`cell-${x}-${y}`} x={x} y={y}>
          {cell}
        </Cell>
      ))}
    </tr>
  );
}
