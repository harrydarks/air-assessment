import { Flex } from "antd";
import { Asset } from "../../types/asset";
import { formatTime } from "../../utils/time";
import "./styles.css";

interface IAssetsProps {
  assets: Asset[];
  handleDrag: (id: number) => () => void;
  handleDrop: (id: number) => () => void;
}

export const Assets = ({ assets, handleDrag, handleDrop }: IAssetsProps) => {
  console.log({ assets });
  return (
    <Flex wrap="wrap" gap={16}>
      {assets.map((asset, i) => (
        <div
          draggable={true}
          onDragOver={(ev) => ev.preventDefault()}
          onDragStart={handleDrag(i)}
          onDrop={handleDrop(i)}
          key={i}
          style={{
            backgroundImage: `url(${asset.assets.image})`,
            height: 200,
            backgroundSize: "cover",
            width: 0,
            paddingLeft: (200 / asset.height) * asset.width,
            position: "relative",
            borderRadius: 5,
          }}
        >
          {asset.type === "video" && (
            <div className="asset-time">{formatTime(asset.duration)}</div>
          )}
        </div>
      ))}
    </Flex>
  );
};
