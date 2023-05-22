import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";

export default function Home() {
  return (
   <>
   <div className="d-flex gap-3 mb4">
   <AddClientModal />
   </div>
      <Projects />
      <hr/>
      <Clients />
   
   </>
  )
}
