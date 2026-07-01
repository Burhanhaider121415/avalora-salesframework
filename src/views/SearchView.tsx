import React from 'react';
import { Search } from 'lucide-react';

const SearchView: React.FC = () => {
  return (
    <div className="flex-col gap-6">
      <div className="flex items-center gap-2 card" style={{ padding: '12px 16px' }}>
        <Search size={20} color="var(--color-muted-sage)" />
        <input 
          type="text" 
          placeholder="Search what they said..." 
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px', fontFamily: 'inherit' }} 
        />
      </div>

      <div>
        <h3 className="label-text mb-4">Quick Searches</h3>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" style={{ width: 'auto', minHeight: '36px', padding: '0 16px' }}>Price</button>
          <button className="btn btn-secondary" style={{ width: 'auto', minHeight: '36px', padding: '0 16px' }}>HIPAA</button>
          <button className="btn btn-secondary" style={{ width: 'auto', minHeight: '36px', padding: '0 16px' }}>Is this AI?</button>
          <button className="btn btn-secondary" style={{ width: 'auto', minHeight: '36px', padding: '0 16px' }}>We have CRM</button>
          <button className="btn btn-secondary" style={{ width: 'auto', minHeight: '36px', padding: '0 16px' }}>Commission</button>
        </div>
      </div>
      
      <div className="mt-4">
        <p style={{ color: 'var(--color-muted-sage)', textAlign: 'center', fontSize: '14px', marginTop: '40px' }}>
          Search results will appear here.
        </p>
      </div>
    </div>
  );
};

export default SearchView;
