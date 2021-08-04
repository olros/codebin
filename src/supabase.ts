import { createClient } from '@supabase/supabase-js';
import { Code } from 'types';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://zmwwwatfunuqfkkqnamh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODA3NTkyOCwiZXhwIjoxOTQzNjUxOTI4fQ.MbAlwlvopoPQVUuB7bUfAwFqhRAK0C8Vq0GP-HV3wYU',
);

const TABLE_CODES = supabase.from<Code>('codes');

const getCodeById = (id: string) => TABLE_CODES.select('*').match({ id });
const createCode = (code: Omit<Code, 'id'>) => TABLE_CODES.insert([code]);
const updateCode = (id: string, code: Omit<Code, 'id'>) => TABLE_CODES.update(code).match({ id: id });

export { supabase, getCodeById, createCode, updateCode };
