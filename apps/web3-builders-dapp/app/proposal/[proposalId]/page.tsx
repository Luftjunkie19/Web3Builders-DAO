import ProposalContainer from "@/components/proposal/ProposalContainer";
import { supabase } from "@/lib/db/supabaseConfigClient";



async function ProposalPage({params}: {params: {proposalId: string}}) {
  const {proposalId}= await params;

const {data}=await supabase.from('dao_proposals').select('*, dao_members:dao_members(*), dao_vote_options:dao_vote_options(*), calldata_objects:calldata_objects(*)').eq('proposal_id', proposalId).single();
  
const {data:commentsData}=await supabase.from('dao_voting_comments').select('*, dao_members:dao_members(*)').eq('proposal_id', proposalId);

  return (
    <div className='w-full h-full'>
      <p className="text-white" onClick={()=>{console.log(data)}}>Click: </p>
{data && <ProposalContainer proposalId={proposalId} commentsData={commentsData ?? []} proposalData={data} />}

    </div>
  )
}

export default ProposalPage