import React, { useEffect, useState } from "react";
import { Controls } from "./components/Controls/Controls";
import axios from "axios";
import { BoardItem } from "./types/board";
import { BoardItems } from "./components/Board/Board";
import { Collapse, CollapseProps } from "antd";
import { Assets } from "./components/Assets/Assets";

function App() {
  const [boardItems, setBoardItems] = useState<BoardItem[]>([]);

  const fetchBoardItems = async () => {
    try {
      const {
        data: { data: items },
      } = await axios.post(
        "https://api.air.inc/shorturl/bDkBvnzpB/boards/c74bbbc8-602b-4c88-be71-9e21b36b0514",
        {
          ancestorCutoff: "c74bbbc8-602b-4c88-be71-9e21b36b0514",
          numThumbnails: 1,
          sortBy: "custom",
          view: "c74bbbc8-602b-4c88-be71-9e21b36b0514",
          includeAncestors: true,
          libraryBoards: "ALL",
          limit: 30,
          cursor: null,
          sortField: { direction: "desc", name: "dateModified" },
        }
      );
      setBoardItems(items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchBoardItems();
  }, []);

  const collapseItems: CollapseProps["items"] = [
    {
      key: "board",
      label: `BOARDS (${boardItems.length})`,
      children: <BoardItems boardItems={boardItems} />,
    },
    { key: "assets", label: "ASSETS", children: <Assets /> },
  ];

  return (
    <div>
      <Controls />
      <Collapse
        defaultActiveKey={["board", "assets"]}
        ghost
        items={collapseItems}
      />
    </div>
  );
}

export default App;
