import React, { useEffect, useState } from "react";
import { Controls } from "./components/Controls/Controls";
import axios from "axios";
import { BoardItem } from "./types/board";
import { BoardItems } from "./components/Board/Board";
import { Collapse, CollapseProps, Empty, Spin } from "antd";
import { Assets } from "./components/Assets/Assets";
import { Asset } from "./types/asset";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [boardItems, setBoardItems] = useState<BoardItem[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [assets, setAssets] = useState<Asset[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

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

  const fetchAssets = async () => {
    setLoading(true);

    try {
      const {
        data: {
          data: { clips: assets, total },
          pagination: { cursor: newCursor, hasMore },
        },
      } = await axios.post(
        "https://api.air.inc/shorturl/bDkBvnzpB/clips/search",
        {
          limit: 72,
          type: "all",
          withOpenDiscussionStatus: true,
          filters: { board: { is: "c74bbbc8-602b-4c88-be71-9e21b36b0514" } },
          boardId: "c74bbbc8-602b-4c88-be71-9e21b36b0514",
          sortField: { direction: "desc", name: "dateModified" },
          descendantBoardId: "c74bbbc8-602b-4c88-be71-9e21b36b0514",
          cursor,
        }
      );
      setAssets((prevItems) => [...prevItems, ...assets]);
      setTotal(total);
      setCursor(newCursor);
      setHasMore(hasMore);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBoardItems();
    fetchAssets();
    return () => setAssets([]);
  }, []);

  const collapseItems: CollapseProps["items"] = [
    {
      key: "board",
      label: `BOARDS (${boardItems.length})`,
      children: <BoardItems boardItems={boardItems} />,
    },
    {
      key: "assets",
      label: `ASSETS (${total})`,
      children: (
        <InfiniteScroll
          dataLength={assets.length}
          next={fetchAssets}
          hasMore={hasMore} // Replace with a condition based on your data source
          loader={<Spin tip="Loading assets..." />}
          endMessage={<Empty description="No data to be loaded" />}
        >
          <Assets assets={assets} />
        </InfiniteScroll>
      ),
    },
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
