import { Flex } from "antd";
import { Asset } from "../../types/asset";
import { formatTime } from "../../utils/time";
import "./styles.css";

interface IAssetsProps {
  assets: Asset[];
}

export const Assets = ({ assets }: IAssetsProps) => {
  console.log({ assets });
  return (
    <Flex wrap="wrap" gap={16}>
      {assets.map((asset, i) => (
        <div
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
