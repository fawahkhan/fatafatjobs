/*
  # Initial Schema for Fatafat Local Services

  1. New Tables
    - `profiles`
      - Extends auth.users with additional user information
      - Stores both service providers and customers
    - `services`
      - Stores service listings created by providers
    - `categories`
      - Predefined service categories
    - `bookings`
      - Tracks service bookings between customers and providers
    - `reviews`
      - Stores customer reviews for completed services

  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Public read access to services and categories
      - Authenticated user access to own profile
      - Service providers can manage their services
      - Customers can create bookings
      - Customers can review completed bookings

  3. Enums
    - booking_status: tracks the state of bookings
    - user_type: distinguishes between customers and service providers
*/

-- Create custom types
CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'completed', 'cancelled');
CREATE TYPE user_type AS ENUM ('customer', 'provider');

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  user_type user_type NOT NULL DEFAULT 'customer',
  full_name text,
  avatar_url text,
  phone text,
  bio text,
  location_lat numeric,
  location_lng numeric,
  address text,
  city text,
  state text,
  postal_code text,
  country text DEFAULT 'US',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES profiles(id) NOT NULL,
  category_id uuid REFERENCES categories(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  price_per_hour numeric NOT NULL,
  image_url text,
  location_lat numeric,
  location_lng numeric,
  city text,
  state text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) NOT NULL,
  customer_id uuid REFERENCES profiles(id) NOT NULL,
  provider_id uuid REFERENCES profiles(id) NOT NULL,
  status booking_status DEFAULT 'pending',
  scheduled_at timestamptz NOT NULL,
  duration_hours numeric NOT NULL,
  total_amount numeric NOT NULL,
  customer_notes text,
  provider_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  service_id uuid REFERENCES services(id) NOT NULL,
  customer_id uuid REFERENCES profiles(id) NOT NULL,
  provider_id uuid REFERENCES profiles(id) NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Services policies
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Providers can insert their own services"
  ON services FOR INSERT
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their own services"
  ON services FOR UPDATE
  USING (auth.uid() = provider_id)
  WITH CHECK (auth.uid() = provider_id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = customer_id OR auth.uid() = provider_id);

CREATE POLICY "Customers can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() IN (customer_id, provider_id))
  WITH CHECK (auth.uid() IN (customer_id, provider_id));

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Customers can create reviews for their bookings"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = customer_id AND
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_id
      AND bookings.status = 'completed'
      AND bookings.customer_id = auth.uid()
    )
  );

-- Insert initial categories
INSERT INTO categories (name, slug, description, icon) VALUES
  ('Home Cleaning', 'home-cleaning', 'Professional home cleaning services', 'home'),
  ('Plumbing', 'plumbing', 'Expert plumbing repair and installation', 'tool'),
  ('Personal Training', 'personal-training', 'Professional fitness training', 'activity'),
  ('Math Tutoring', 'math-tutoring', 'Mathematics tutoring for all levels', 'book-open'),
  ('Gardening', 'gardening', 'Garden maintenance and landscaping', 'flower'),
  ('Pet Care', 'pet-care', 'Professional pet sitting and dog walking', 'paw');