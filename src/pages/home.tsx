import React from 'react';
import { api } from "~/utils/api"

const Home = () => {
    const {data} = api.category.getAll.useQuery({});
    console.log(data?.map((d)=>d.name))
    
  return (
  <>hola</>
  );
};

export default Home;

