import React from 'react';
import { SingleGrid } from '@/assets/icons/SingleGrid';
import { DoubleGrid } from '@/assets/icons/DoubleGrid';
import { TripleGrid } from '@/assets/icons/TripleGrid';
import clsx from 'clsx';

interface GridSelectorProps {
  gridView: string;
  setGridView: (...arg: any) => void;
}

export type GridSize = '4x4' | '6x6';

function GridSelector({ gridView, setGridView }: GridSelectorProps) {
  return (
    <div className="ml-4  hidden divide-gray-800 rounded-lg border-2 border-solid border-gray-800 sm:flex">
    

      <button
        className={clsx(
          'hidden w-10 items-center justify-center border-l-2 border-gray-800 md:flex',
          {
            'bg-gray-800': gridView === '4x4',
          }
        )}
        onClick={() => setGridView('4x4')}
      >
        <TripleGrid
          className={gridView !== '4x4' ? 'transition hover:scale-110' : ''}
          color={gridView === '4x4' ? 'white' : '#707070'}
        />
      </button>
    </div>
  );
}

export default GridSelector;
