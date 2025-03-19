'use client';

import { Search } from 'lucide-react';
import { Command } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useReducer } from 'react';

type State = {
  query: string;
  results: any[];
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SEARCH_START' }
  | { type: 'SEARCH_SUCCESS'; payload: any[] }
  | { type: 'SEARCH_ERROR'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SEARCH_START':
      return { ...state, isLoading: true, error: null };
    case 'SEARCH_SUCCESS':
      return { ...state, isLoading: false, results: action.payload };
    case 'SEARCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export function SearchBox() {
  const [state, dispatch] = useReducer(reducer, {
    query: '',
    results: [],
    isLoading: false,
    error: null,
  });

 

  return (
    <div className="sticky top-4 z-50 mx-4 mb-4">
      <Command className="rounded-lg shadow-lg border bg-card">
        <div className="flex items-center px-3">
          <Search className="mr-2 h-4 w-4 opacity-50" />
          <input
            value={state.query}
            onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
            placeholder="搜索链接、标签或内容..."
            className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {state.isLoading && (
          <div className="px-4 py-2">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full mb-2" />
            ))}
          </div>
        )}

        {state.results.length > 0 && (
          <div className="border-t p-2">
            {state.results.map((result) => (
              <div
                key={result.id}
                className="flex items-center p-2 hover:bg-accent rounded cursor-pointer"
              >
                <span className="text-sm">{result.title}</span>
              </div>
            ))}
          </div>
        )}
      </Command>
    </div>
  );
}
