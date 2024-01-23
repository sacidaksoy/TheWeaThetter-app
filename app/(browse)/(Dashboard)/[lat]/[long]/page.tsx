import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getWeather } from "../../_queries/useWeather";
import Weather from "../../_components/weather";

export default async function DashboardPage({
  params,
}: {
  params: { lat: string; long: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["weather"],
    queryFn: getWeather(
      Number(params.lat),
      Number(params.long)
    ) as unknown as () => void,
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Weather latitude={params.lat} longitude={params.long} />
    </HydrationBoundary>
  );
}
