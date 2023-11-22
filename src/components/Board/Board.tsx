import { Flex } from "antd";
import { BoardItem } from "../../types/board";
import "./styles.css";

interface IBoardProps {
  boardItems: BoardItem[];
}

export const BoardItems = ({ boardItems }: IBoardProps) => {
  return (
    <Flex gap={16} wrap="wrap">
      {boardItems.map((item, i) => (
        <div
          key={i}
          className="board-item"
          style={{
            backgroundImage: `url(${item.thumbnails[0]})`,
          }}
        >
          <div className="board-item-gradient" />
          <div className="board-item-title">{item.title}</div>
        </div>
      ))}
    </Flex>
  );
};
