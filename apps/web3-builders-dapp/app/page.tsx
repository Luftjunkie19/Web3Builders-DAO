import ProposalList from "@/components/home/ProposalList";
import ProposalModal from "@/components/home/ProposalModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {

  return (
    <div className="w-full h-full">
            <ProposalModal/>
            <ProposalList/>


    </div>
  );
}
