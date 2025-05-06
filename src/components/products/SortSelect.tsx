
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SortSelectProps {
  selectedSort: string;
  onValueChange: (value: string) => void;
}

const SortSelect = ({ selectedSort, onValueChange }: SortSelectProps) => {
  return (
    <div className="hidden md:block w-72">
      <Select value={selectedSort} onValueChange={(val) => {
        onValueChange(val);
      }}>
        <SelectTrigger className="border-luxe-gold/30">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelect;
