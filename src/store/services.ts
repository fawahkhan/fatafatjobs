import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  title: string;
  description: string;
  price_per_hour: number;
  image_url: string;
  provider: {
    full_name: string;
  };
  category: {
    name: string;
  };
}

interface ServicesState {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  fetchServices: (filters?: any) => Promise<void>;
  createService: (serviceData: Partial<Service>) => Promise<void>;
}

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async (filters) => {
    try {
      set({ isLoading: true, error: null });
      
      let query = supabase
        .from('services')
        .select(`
          *,
          provider:profiles(full_name),
          category:categories(name)
        `);

      if (filters?.category) {
        query = query.eq('category.slug', filters.category);
      }

      if (filters?.priceRange) {
        const [min, max] = filters.priceRange.split('-');
        if (min) query = query.gte('price_per_hour', min);
        if (max) query = query.lte('price_per_hour', max);
      }

      const { data, error } = await query;

      if (error) throw error;
      set({ services: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  createService: async (serviceData) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);
      
      if (error) throw error;
      
      // Refresh services list
      const { fetchServices } = useServicesStore.getState();
      await fetchServices();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));