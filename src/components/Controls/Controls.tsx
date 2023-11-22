import {
  AppstoreOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Flex, Input, Row, Typography } from "antd";

export const Controls = () => {
  return (
    <div>
      <Row justify="space-between">
        <Col xs={24} sm={12}>
          <Input prefix={<SearchOutlined />} addonAfter={<SettingOutlined />} />
        </Col>
        <Col xs={24} sm={12}>
          <Flex justify="flex-end" gap={8}>
            <Button icon={<ArrowRightOutlined />} />
            <Button type="primary">Save to...</Button>
          </Flex>
        </Col>
      </Row>
      <Typography.Title level={3}>Air Branded Boards</Typography.Title>
      <Typography.Text type="secondary">
        With a bunch of stock photos!
      </Typography.Text>
      <Flex justify="flex-end" align="center">
        <Typography.Text>Date modified</Typography.Text>
        <Button icon={<ArrowDownOutlined />} type="text" />
        <Button icon={<SettingOutlined />} type="text" />
        <Button icon={<AppstoreOutlined />} type="text" />
      </Flex>
      <Divider style={{ margin: "12px 0px" }} />
    </div>
  );
};
