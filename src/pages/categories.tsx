/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/await-thenable */
import React, { useEffect, useState } from 'react';
import Header from '~/components/Header';
import { api } from '~/utils/api';
import SignupForm from './signup';

interface Categories{
    id: number;
    name: string;
  }
  
  interface User{
    id: number;
    username: string;
    email: string;
    password: string;
    isAuthenticated : boolean;
    categories: Categories[];
    otp?: string;
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
            className={`mr-2 mt-6 text-xs ${pageNumber === currentPage ? 'font-semibold' : 'font-thin'} hover:underline`}
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
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 17;
  const [pageError, setPageError] = useState('');
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data: categories, error } = api.category.getCategoriesForPagination.useQuery({ page: currentPage });

  const updateCategory = api.category.updateUserCategories.useMutation();

  useEffect(() => {
    const name = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (name && email) {
      setUserData({ ...userData, name: name, email: email });
      setUserLoggedIn(true);
      // Fetch user's selected categories here
      // Assuming you have a function to fetch user data by email from the backend
      // Replace fetchUserCategories with the appropriate function to fetch user data
      void fetchUserCategories(email);
    }
  }, []);

  useEffect(() => {
    if (error) setPageError('Error fetching categories.' + JSON.stringify(error.message));
  }, [error]);

  const handlePageChange = (pageNumber:number) => {
    setPageError('');
    setCurrentPage(pageNumber);
  };

  // Function to fetch user's selected categories
  const fetchUserCategories = async (email:string) => {
    try {
        const { data: user } = await api.user.getUserDataByEmail.useQuery({email})
      setSelectedCategories(user.categories);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to handle category selection
  const handleCategorySelection = (categoryId) => {
    // Toggle category selection
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Function to update user's selected categories
  const updateUserCategories = async () => {
    try {
      await updateCategory.mutateAsync({
        email: userData.email,
        categories: selectedCategories.map((categoryId) => {
          // Map category IDs to the required structure (id and name)
          const category = categories.find((c) => c.id === categoryId);
          return { id: category.id, name: category.name };
        }),
      });
      // Successfully updated categories
      console.log('Updated user categories:', selectedCategories);
    } catch (error) {
      console.error('Error updating user categories:', error);
    }
  };

  return (
    <>
      {isUserLoggedIn ? (
        <div>
          <Header>

            <div className="w-2/5 mx-auto border border-gray-300 rounded-xl p-8 mt-4">
              <p className="text-xl font-medium mb-4 text-center tracking-widest">
                Please mark your interests!
              </p>
              <p className="text-sm font-light text-center mb-4 tracking-wide">
                We will keep you notified.
              </p>
              <p className="text-xs mb-2 font-extralight text-center tracking-wide">
                My saved interests!
              </p>
              {categories && (
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          disabled={userData.categories?.includes(category)}
                          onChange={() => handleCategorySelection(category.id)}
                        />{' '}
                        {category.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              {pageError ? <p className='mt-4 text-xs text-red-600 text-center'>{pageError}</p>: <></>}
              <button
                onClick={updateUserCategories}
                className="w-full bg-black text-white font-light tracking-widest text-xs px-6 py-4 rounded uppercase mt-6 mx-auto block hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </Header>
        </div>
      ) : (
        <SignupForm />
      )}
    </>
  );
};

export default Categories;
