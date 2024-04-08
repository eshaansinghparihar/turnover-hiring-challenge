/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import { api } from '~/utils/api';

const PushData = () => {
  const { data: generatedCategories } = api.category.generateCategories.useQuery({});
  const push = api.category.pushCategory.useMutation()

  const [isPushed, setIsPushed] = useState(false);

  const handlePushCategories = async () => {
    if (generatedCategories) {
      console.log(generatedCategories)
      await push.mutateAsync(generatedCategories);
      setIsPushed(true);
    } else {
      console.error('No generated categories to push');
    }
  };

  return (
    <div>
      <button onClick={handlePushCategories} disabled={isPushed}>
        {isPushed ? 'Categories Pushed' : 'Push Categories'}
      </button>
    </div>
  );
};

export default PushData;
