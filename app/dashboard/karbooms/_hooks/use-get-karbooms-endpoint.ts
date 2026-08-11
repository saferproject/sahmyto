import { useQuery } from "@tanstack/react-query";
import { karboomService } from "../_services/karboom-service";

export default function useGetKarboomsEndpoint() {
  return useQuery({
    queryKey: ["karbooms"],
    queryFn: ({ signal }) => karboomService.getKarbooms(signal),
  });
}
