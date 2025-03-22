'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { IconCirclePlusFilled, IconMinus, IconPlus } from '@tabler/icons-react';

export default function Counter() {
  const [count, setCount] = useState(25);

  return (
    <div className="flex items-center space-x-4 pb-5 rounded-lg w-full text-white">

        <Button variant="primary" className="w-full" onClick={() => setCount(prev => prev - 25)}  disabled={count <= 25}>
        <IconMinus stroke={2} />
        </Button>
    
      <span className="text-lg w-full font-semibold  text-center">{count} باکس</span>
      <Button variant="primary" className="w-full" onClick={() => setCount(prev => prev + 25)}>
        <IconPlus stroke={2} />
      </Button>
    </div>
  );
}
