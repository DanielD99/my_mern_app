import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Home from "./pages/Home";
import NotFound from './pages/NotFound';
import Project from './pages/Project';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: "http://localhost:3000/graphql" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
<>
<ApolloProvider client={client}>
<Header />  
    <div className="container">

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/projects/:id" element=
          {<Project />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </div>
</ApolloProvider>
    </>
  );
}

export default App;
