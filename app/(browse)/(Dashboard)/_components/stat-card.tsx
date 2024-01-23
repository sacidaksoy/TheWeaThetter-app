"use client";

import { Card, Color, Metric, Text } from "@tremor/react";

interface StatCardProps {
  title: string;
  metric: string;
  color: Color;
}

export default function StatCard({ title, metric, color }: StatCardProps) {
  return (
    <Card decoration={"top"} decorationColor={color}>
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  );
}
