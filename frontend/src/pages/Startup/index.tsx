import "./styles.css";

import { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Typography } from "antd";

const { Title } = Typography;

interface ProjectType {
  id: number;
  name: string;
  description: string;
}

const initialProjects: ProjectType[] = [
  {
    id: 1,
    name: "Tuskable",
    description: "The most promising startup in startup lisboa",
  },
  {
    id: 2,
    name: "Mystic",
    description: "The most promising startup in Pool Side",
  },
  {
    id: 3,
    name: "Super TTT",
    description: "The coolest game ever",
  },
];

export default function Home() {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProjectType[]>(initialProjects);

  return (
    <>
      <Title level={2}>Your grants</Title>
      <List
        className="demo-loadmore-list"
        header={<div className="d-flex"><Button>Add Grant</Button></div>}
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${item.id}`}
                  />
                }
                title={item.name}
                description={item.description}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}
