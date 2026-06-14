import { useQuery } from "@tanstack/react-query";
import { karboomService } from "../_services/karboom-service";

export default function useGetKarbooms() {
  return useQuery({
    queryKey: ["karbooms"],
    queryFn: karboomService.getKarbooms,
  });
}
