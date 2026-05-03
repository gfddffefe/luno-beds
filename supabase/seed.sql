-- 12 Sample Products

INSERT INTO public.products (name, slug, description, price, compare_price, category, images, stock_quantity, is_featured, rating, review_count)
VALUES
  ('The Horizon Bed Frame', 'horizon-bed-frame', 'A minimalist wooden bed frame designed for durability and quiet support.', 899.00, 1100.00, 'beds', ARRAY['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'], 20, true, 4.8, 124),
  ('Cloud Tufted Bed', 'cloud-tufted-bed', 'Upholstered headboard with plush tufting for maximum comfort.', 1250.00, NULL, 'beds', ARRAY['https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=800&q=80'], 15, false, 4.5, 89),
  ('Platform Base Minimal', 'platform-base-minimal', 'Low-profile metal platform base with under-bed storage space.', 450.00, 500.00, 'beds', ARRAY['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'], 40, false, 4.2, 56),
  ('The Grand Estate Bed', 'grand-estate-bed', 'A statement piece featuring solid oak and brass accents.', 1800.00, NULL, 'beds', ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'], 5, true, 5.0, 12),

  ('Luno Signature Mattress', 'luno-signature-mattress', 'Our award-winning hybrid mattress with cooling gel and adaptive coils.', 999.00, 1200.00, 'mattresses', ARRAY['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'], 50, true, 4.9, 342),
  ('Essential Memory Foam', 'essential-memory-foam', 'Three layers of dense memory foam for contouring support.', 499.00, NULL, 'mattresses', ARRAY['https://images.unsplash.com/photo-1592789705501-f9ae4278a9c9?w=800&q=80'], 30, false, 4.4, 210),
  ('Eco-Latex Breathe', 'eco-latex-breathe', 'Organic latex mattress for responsive support and breathability.', 1450.00, 1600.00, 'mattresses', ARRAY['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80'], 10, false, 4.7, 88),
  ('The Firm Standard', 'the-firm-standard', 'High-density support system for stomach and back sleepers.', 799.00, NULL, 'mattresses', ARRAY['https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80'], 25, false, 4.6, 145),

  ('Cooling Cloud Pillow', 'cooling-cloud-pillow', 'Shredded memory foam with a cool-to-the-touch phase change cover.', 85.00, 110.00, 'pillows', ARRAY['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80'], 100, false, 4.8, 512),
  ('Down Alternative Standard', 'down-alternative-standard', 'Hypoallergenic plush microfiber fill that mimics the feel of down.', 45.00, NULL, 'pillows', ARRAY['https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80'], 150, false, 4.3, 302),
  ('Ergonomic Contour Pillow', 'ergonomic-contour-pillow', 'Solid memory foam molded to support the neck and align the spine.', 65.00, 80.00, 'pillows', ARRAY['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80'], 80, false, 4.5, 198),
  ('The Luxury Silk Pillow', 'luxury-silk-pillow', 'Premium silk casing with a delicate, supportive inner core.', 120.00, NULL, 'pillows', ARRAY['https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=800&q=80'], 30, false, 4.9, 45)
ON CONFLICT (slug) DO UPDATE SET images = EXCLUDED.images;
