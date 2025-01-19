import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Booking {
  id: string;
  service_id: string;
  customer_id: string;
  provider_id: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  scheduled_at: string;
  duration_hours: number;
  total_amount: number;
  service: {
    title: string;
  };
  provider: {
    full_name: string;
  };
}

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  fetchUserBookings: () => Promise<void>;
  createBooking: (bookingData: Partial<Booking>) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => Promise<void>;
}

export const useBookingsStore = create<BookingsState>((set) => ({
  bookings: [],
  isLoading: false,
  error: null,

  fetchUserBookings: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          service:services(title),
          provider:profiles(full_name)
        `)
        .or(`customer_id.eq.${user.id},provider_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ bookings: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  createBooking: async (bookingData) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);
      
      if (error) throw error;
      
      // Refresh bookings list
      const { fetchUserBookings } = useBookingsStore.getState();
      await fetchUserBookings();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateBookingStatus: async (bookingId, status) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      // Refresh bookings list
      const { fetchUserBookings } = useBookingsStore.getState();
      await fetchUserBookings();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));