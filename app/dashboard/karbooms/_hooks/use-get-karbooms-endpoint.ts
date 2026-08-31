import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import { karboomService } from "../_services/karboom-service";

export default function useGetKarboomsEndpoint() {
  return useInfiniteListQuery({
    queryKey: ["karbooms"],
    queryFn: (page, signal) => karboomService.getKarbooms(signal, page),
  });
}
