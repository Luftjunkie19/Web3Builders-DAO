import ProposalList from "@/components/home/proposal-list/ProposalListContainer";
import ProposalModal from "@/components/home/ProposalModal";

export default function Home() {

  return (
    <div className="w-full h-full">
      <div className="w-full h-full p-2">
            <ProposalModal/>
            
      </div>
            <ProposalList/>


    </div>
  );
}
