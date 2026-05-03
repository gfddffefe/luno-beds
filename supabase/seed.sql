-- 12 Sample Products

INSERT INTO public.products (name, slug, description, price, compare_price, category, images, stock_quantity, is_featured, rating, review_count)
VALUES
  ('The Horizon Bed Frame', 'horizon-bed-frame', 'A minimalist wooden bed frame designed for durability and quiet support.', 899.00, 1100.00, 'beds', ARRAY['https://picsum.photos/seed/bed1/800/800'], 20, true, 4.8, 124),
  ('Cloud Tufted Bed', 'cloud-tufted-bed', 'Upholstered headboard with plush tufting for maximum comfort.', 1250.00, NULL, 'beds', ARRAY['https://picsum.photos/seed/bed2/800/800'], 15, false, 4.5, 89),
  ('Platform Base Minimal', 'platform-base-minimal', 'Low-profile metal platform base with under-bed storage space.', 450.00, 500.00, 'beds', ARRAY['https://picsum.photos/seed/bed3/800/800'], 40, false, 4.2, 56),
  ('The Grand Estate Bed', 'grand-estate-bed', 'A statement piece featuring solid oak and brass accents.', 1800.00, NULL, 'beds', ARRAY['https://picsum.photos/seed/bed4/800/800'], 5, true, 5.0, 12),

  ('Luno Signature Mattress', 'luno-signature-mattress', 'Our award-winning hybrid mattress with cooling gel and adaptive coils.', 999.00, 1200.00, 'mattresses', ARRAY['https://picsum.photos/seed/mat1/800/800'], 50, true, 4.9, 342),
  ('Essential Memory Foam', 'essential-memory-foam', 'Three layers of dense memory foam for contouring support.', 499.00, NULL, 'mattresses', ARRAY['https://picsum.photos/seed/mat2/800/800'], 30, false, 4.4, 210),
  ('Eco-Latex Breathe', 'eco-latex-breathe', 'Organic latex mattress for responsive support and breathability.', 1450.00, 1600.00, 'mattresses', ARRAY['https://picsum.photos/seed/mat3/800/800'], 10, false, 4.7, 88),
  ('The Firm Standard', 'the-firm-standard', 'High-density support system for stomach and back sleepers.', 799.00, NULL, 'mattresses', ARRAY['https://picsum.photos/seed/mat4/800/800'], 25, false, 4.6, 145),

  ('Cooling Cloud Pillow', 'cooling-cloud-pillow', 'Shredded memory foam with a cool-to-the-touch phase change cover.', 85.00, 110.00, 'pillows', ARRAY['https://picsum.photos/seed/pil1/800/800'], 100, false, 4.8, 512),
  ('Down Alternative Standard', 'down-alternative-standard', 'Hypoallergenic plush microfiber fill that mimics the feel of down.', 45.00, NULL, 'pillows', ARRAY['https://picsum.photos/seed/pil2/800/800'], 150, false, 4.3, 302),
  ('Ergonomic Contour Pillow', 'ergonomic-contour-pillow', 'Solid memory foam molded to support the neck and align the spine.', 65.00, 80.00, 'pillows', ARRAY['https://picsum.photos/seed/pil3/800/800'], 80, false, 4.5, 198),
  ('The Luxury Silk Pillow', 'luxury-silk-pillow', 'Premium silk casing with a delicate, supportive inner core.', 120.00, NULL, 'pillows', ARRAY['https://picsum.photos/seed/pil4/800/800'], 30, false, 4.9, 45);
