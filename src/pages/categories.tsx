/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import Header from '~/components/Header';
import { api } from '~/utils/api';
import SignupForm from './signup';

interface Categories{
  id: number;
  name: string;
  user:Record<string, never>;
  userId: number | null;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = [];
  const startPage = Math.max(1, Math.min(currentPage - 3, totalPages - 6));
  const endPage = Math.min(totalPages, startPage + 6);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button className="mr-2 text-xs font-thin" onClick={() => onPageChange(1)}>&lt;&lt;</button>
      <button className="mr-2 text-xs font-thin" onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>&lt;</button>
      {pageNumbers.map((pageNumber) => (
        <button 
          key={pageNumber} 
          onClick={() => onPageChange(pageNumber)}
          className={`mr-2 text-xs ${pageNumber === currentPage ? 'font-semibold' : 'font-thin'}`}
        >
          {pageNumber}
        </button>
      ))}
      <button className="mr-2 text-xs font-thin" onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}>&gt;</button>
      <button className="text-xs font-thin" onClick={() => onPageChange(totalPages)}>&gt;&gt;</button>
    </div>
  );
};


const Categories = () => {
  const [userData, setUserData]=useState({
    name:'',
    email:''
  })
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages=17;
  const [pageError, setPageError] = useState('');
  const [isUserLoggedIn, setUserLoggedIn]=useState(false)
  
  const { data: categories, error } = api.category.getCategoriesForPagination.useQuery({ page: currentPage });

  if(error)
  setPageError('Error fetching categories.')

  useEffect(()=>{
    const name=localStorage.getItem("username");
    const email=localStorage.getItem("email");
    if(name && email){
      setUserData({...userData, name:name, email:email})
      setUserLoggedIn(true)
    }
  },[])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isUserLoggedIn ? 
        <div>
          <Header>
            <div className="w-2/5 mx-auto border border-gray-300 rounded-xl p-8 mt-4">
              <p className="text-xl font-medium mb-4 text-center tracking-widest">Please mark your interests!</p>
              <p className="text-sm font-light text-center mb-4 tracking-wide">We will keep you notified.</p>
              <p className="text-xs mb-2 font-extralight text-center tracking-wide">My saved interests!</p>
              {categories && (
                <ul>
                  {categories.map(category => (
                    <li 
                    className="text-sm"
                    key={category.id}>{category.name}</li>
                  ))}
                </ul>
              )}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              {pageError ? <p>{pageError}</p>: <></>}
            </div>
          </Header>
        </div>
        : 
        <SignupForm/>
      }
    </>
  );
};

export default Categories;

